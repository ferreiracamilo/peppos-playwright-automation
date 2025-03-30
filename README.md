# peppos-playwright-automation
Automation Testing Practise on Peppos website

## What I need to do to execute in my computer the project for first time?
1. Go to https://nodejs.org/en (NodeJS 20.10.2 or greater)
2. Execute and complete installation of the installer downloaded on previous step
3. Download Visual Studio Code and install extension https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright (under name 'Playwright Test for VSCode')
4. Close and reopen visual studio code
5. Download the repository/code of the playwright framework
6. From now on just open the folder with Visual Studio Code
7. At terminal (command line)
    1. Assure you are located on project folder
    2. Write into console "npm install" and hit enter, wait until finishes **-every time there's a new dependency, execute this command-**
8. Enjoy coding and playing around with the automation

## How can I execute test cases?

### Run with Playwright Plugin/extension
- Over the activity bar (left bar with icons) click the test tube or beaker icon (if you hover will display 'Testing')
- Then browse with your mouse until you see the test case you'd like to execute
- If you click play icon/button will show results only in console/terminal or if click the bug icon (Debug) will open up the browser

### Over terminal/console
- Click 'Terminal' menu button
- Click 'New Terminal' button
- Make sure you are located within project's folder 'par-salesforce-qa'
- Type command line as below examples -in all cases will work with 'playwright.config.js' and 'package.json' settings unless you declare something different-

#### Run Debug and visual mode
Run test in UI Mode which provides a time travel debugging
```
npx playwright test --ui
```

Run test in headed mode, basically will show test in actual browser without debugging mode
```
npx playwright test --headed
```

#### Run in specific browser/s
To specify multiple browsers to run your tests on, use the --project flag multiple times followed by the name of each browser. In case you want only one just write the one you want, e.g. '--project chromium'.
```
npx playwright test --project chromium --project firefox
```

#### Run based on test tags
To run specific tag/s (applying OR logical condition)
```
npx playwright test --grep "@accountdup|@regression"
```
To run all test cases except the ones with tag
```
npx playwright test --grep-invert "@accountdup"
```

### Run specific tests

To run a single test file, pass in the name of the test file that you want to run.
```
npx playwright test lead_campaign_history.spec.js
```

To run a test with a specific title, use the -g flag followed by the title of the test.
```
npx playwright test -g "Verify campaign history at contact layout and its view"
```

## Notes/Workarounds for SDET
- **Do not place returns within test.step, otherwise return is undefined**
- In case a command/code line is working by doing debug with browser visible but not working in headless/headful by normal execution. Most likely is an issue of wait/load time and/or if it's a class update the page variable.
- When using setdropdown by index option avoid the index 1, usually is --None--
- In case you wanna use Test Recorder Plugin to verify some locator or anything else but you encounter issues. Execute the command below -suggested to select on Target the value 'Library' which is smoother-
-Avoid returns into test.step block, they may go out as undefined. Instead declare a variable before test step, reload it within test step block and after test step block return the variable
```
npx playwright codegen --browser=chromium
```