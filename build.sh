#!/usr/bin/env bash
rm -rf allure-report
rm -rf ./allure-cli/plugins/screen-diff-plugin
cp -r ./src/. ./allure-cli/plugins/screen-diff-plugin/

./allure-cli/bin/allure generate allure-results
