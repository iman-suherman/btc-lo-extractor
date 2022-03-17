#!/usr/bin/env node
const argv = require('yargs');
const {generate_key, generate_controller} = require("./command/generate");

argv
    .version("0.1.0")
    .usage("Usage: $0 <command> [options]")
    .command(generate_key)
    .command(generate_controller)
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .parse()