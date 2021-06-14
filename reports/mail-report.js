const mailer = require('nodemailer'),
	fs = require('fs')

// Environmental to allow level of configuration
const EMAIL_HTML = process.env.EMAIL_HTML || './results/output.html',
	MAILING_SERVICE = process.env.MAILING_SERVICE,
	HOST = process.env.SMPT_HOST || '10.16.10.125',
	USERNAME = process.env.USER,
	PASSWORD = process.env.PASS,
	PORT = process.env.SMPT_PORT || 25,
	FROM = process.env.FROM || 'noreply@prismamp.com',
	TO = process.env.TO || 'decidir_qa@prismamp.com, decidir2redbee@redb.ee, SistemasDecidir@decidir.com.ar',
	SUBJECT = process.env.SUBJECT || 'Reporte de regresión'

if (!fs.existsSync(EMAIL_HTML)) {
	console.error('Report generation failed therefore the email could not be sent. Exiting.')
	process.exit(0)
}

/**
 * Parses the given value into a string o string list being the recipients to which address the email.
 *
 * @param recipients List or string list with the recipients(s).
 * @return {string | string[]} a list of string or a string depending of the recipients value.
 */
function parseRecipients(recipients) {
	const parts = recipients.split(',').map(s => s.trim())

	if (parts.length > 0 && parts[0].length > 1) {
		return parts
	} else {
		throw new Error(`Error parsing email recipients. Not a valid value: "${recipients}". Allowed ones are:\n` +
			`Grouped: "user1@gmail.com,user2@gmail.com,..." or just one "user1@gmail.com"`)
	}
}


// Configure the Mail Transporter
const transporterOptions = MAILING_SERVICE === 'gmail'
	? {
		service: MAILING_SERVICE,
		auth: {user: USERNAME, pass: PASSWORD}
	}
	: {
		host: HOST,
		port: PORT,
		auth: {user: USERNAME, pass: PASSWORD}
	}
const transporter = mailer.createTransport(transporterOptions)

// Then send the email
const mailOptions = {
	from: FROM,
	to: parseRecipients(TO),
	subject: SUBJECT,
	attachments: [
		{
			filename: 'Reporte de regresión.html',
			path: EMAIL_HTML
		}
	]
}
transporter.sendMail(mailOptions, function (error, info) {
	if (error) {
		console.error(error)
	} else {
		console.log('Email sent: ' + info.response)
	}
})
