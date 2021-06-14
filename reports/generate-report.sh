#!/usr/bin/env bash

mochawesome-merge results/*.json > results/output.json
marge results/output.json --reportDir ./results --inline