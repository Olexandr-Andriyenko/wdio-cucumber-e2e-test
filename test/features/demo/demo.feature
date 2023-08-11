Feature: Demo Feature

    # @demo
    Scenario Outline: Run first demo feature
        Given Google page is opened
        # <SearchItem> is a reference to table below
        When Search with <SearchItem>
        Then Click on first search result
        # <ExpectedURL> is a reference to table below
        Then URL should match <ExpectedURL>

        Examples:
            | TestID     | SearchItem | ExpectedURL              |
            | DEMO_TC001 | WDIO       | https://webdriver.io/de/ |