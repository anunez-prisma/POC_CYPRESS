const {post, put} = require('axios')
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const {encode} = require('js-base64')
const xml2js = require('xml2js')


// GLOBALS
const jiraURL = process.env.JIRA_API_URL || 'http://10.10.12.43:8080',
	projectKey = process.env.PROJECT_KEY || 'DECD',
	doneStatusID = process.env.DONE_STATUS_ID || '31',
	url = `${jiraURL}/rest/raven/1.0/import/execution/junit?projectKey=${projectKey}`,
	credentials = encode(`${process.env.USERNAME}:${process.env.PASSWORD}`)


function findUserStoryId(reportFilePath, callback) {
	const fileContent = fs.readFileSync(reportFilePath)

	xml2js.parseString(fileContent, (err, result) => {
		callback(result.testsuites.testsuite[1].$.name)
	})
}


/**
 * This function works over the response received by the request sent to create a Test and Text execution for a User
 * Story. NOTE: that not always a relation is done, if there was not created a new Test, but instead updated an existing
 * one, no relationship is established as it's assumed that this occurred before.
 *
 * @param response    This is the response as was received from the request used to create the Test and its Execution.
 * @param userStoryId Identifier of the User Story to which is linked the created Test.
 */
function relateCreatedIssuesToTheirJIRAs(response, userStoryId) {
	if (!response.data || !response.data.testIssues) {
		return
	}

	const {key, self} = response.data.testIssues.success[0],
		url = `${jiraURL}/rest/api/2/issue/${userStoryId}`,
		payload = {
			'update': {
				'issuelinks': [
					{
						'add': {
							'type': {
								'name': 'Tests',
								'inward': 'tested by',
								'outward': 'tests',
								self
							},
							'inwardIssue': {
								'key': key
							}
						}
					}
				]
			}
		},
		headers = {
			'Authorization': `Basic ${credentials}`,
			'Content-Type': 'application/json'
		}

	console.info('Issuing the request to the XRay API linking Issue to Test:\n' +
		`URL: ${url}\n` +
		`Headers: ${JSON.stringify(headers)}\n` +
		`Payload: ${JSON.stringify(payload)}\n`)

	put(url, payload, {headers})
		.catch(error => {
			console.error('Error linking Issue to Test.', error)
		})
		.then(() => {
			console.info(`Issue linked to Test in XRay API.`)
		})
}


/**
 * Changes the status of the Test that was executed to Done.
 *
 * @param response This is the response as was received from the request used to create the Test and its Execution.
 */
function updateTestToReadyState(response) {
	if (!response || !response.data || !response.data.testIssues) {
		return
	}

	const {key} = response.data.testIssues.success[0],
		url = `${jiraURL}/rest/api/2/issue/${key}/transitions`,
		headers = {
			'Authorization': `Basic ${credentials}`,
			'Content-Type': 'application/json'
		},
		payload = {
			transition: {
				id: doneStatusID
			}
		}

	console.info('Creating the request to XRay API to change the state of the created Test to Ready:\n' +
		`URL: ${url}\n` +
		`Headers: ${JSON.stringify(headers)}\n` +
		`Payload: ${JSON.stringify(payload)}\n`)

	post(url, payload, {headers})
		.catch(error => {
			console.error('Error update Test Issue status.', error.response.data.errorMessages)
		})
		.then(() => {
			console.info(`Test Issue status changed to Done. Obtained response:\n${JSON.stringify(response.data)}`)
		})
}


/**
 * This function is to upload the reports file to XRay API.
 */
function uploadReport(reportFilePath) {
	console.info('Creating the request to XRay API to upload the report file.')

	// Upload the report file
	const formData = new FormData()
	formData.append('file', fs.createReadStream(reportFilePath))

	const headers = {
		...formData.getHeaders(),
		'Authorization': `Basic ${credentials}`
	}

	console.info('Issuing the request to the XRay API:\n' +
		`URL: ${url}\n` +
		`Headers: ${JSON.stringify(headers)}\n` +
		`Form data: ${JSON.stringify(formData)}\n`)

	post(url, formData, {headers})
		.catch(error => {
			console.error('Error uploading reports.', error)
		})
		.then(response => {
			console.info('Test and Execution created/updated in XRay API')

			findUserStoryId(reportFilePath, userStoryId => {
				updateTestToReadyState(response)
				relateCreatedIssuesToTheirJIRAs(response, userStoryId)
			})
		})
}


function main() {
	// Get all report files
	fs.readdir('./results', (err, files) => {
		// Filter those being XMLs and turn them to absolute paths
		const xmlFiles = files
			.filter(file => file.endsWith('.xml'))
			.map(file => path.join(path.dirname(__dirname), 'results', file))

		// Upload each of them
		xmlFiles.forEach(uploadReport)
	})
}


console.info('Starting the reports file generation.')
main()