# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ExploratoryKAIResumeAnalysis.spec.js >> login test and check JD Analysis for single resume part 2
- Location: tests\ExploratoryKAIResumeAnalysis.spec.js:9:3

# Error details

```
Test timeout of 120000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary "Chat sidebar" [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - img "KAI" [ref=e9]
        - generic [ref=e10]: K-AI
      - button [expanded] [ref=e11] [cursor=pointer]:
        - img [ref=e13]
    - generic [ref=e17]:
      - generic "Chatbot" [ref=e18] [cursor=pointer]:
        - img [ref=e20]
        - generic [ref=e22]: Chatbot
      - generic "HR Portal" [ref=e24] [cursor=pointer]:
        - img [ref=e26]
        - generic [ref=e31]:
          - generic [ref=e33]: HR Portal
          - button "Toggle HR Portal menu" [expanded] [ref=e34]:
            - img [ref=e36]
      - generic [ref=e38]:
        - generic "JD Analysis" [ref=e39] [cursor=pointer]:
          - img [ref=e40]
          - generic [ref=e41]: JD Analysis
        - generic "Resume Standardizer" [ref=e42] [cursor=pointer]:
          - img [ref=e44]
          - generic [ref=e47]: Resume Standardizer
    - generic [ref=e51]:
      - generic [ref=e52] [cursor=pointer]:
        - generic [ref=e53]: SP
        - generic [ref=e54]:
          - generic [ref=e55]: Sudhanshu Prakash
          - generic [ref=e56]: sudhanshu.prakash@kumaran.com
      - button "Profile options" [ref=e57] [cursor=pointer]:
        - img [ref=e59]
  - main [ref=e64]:
    - generic [ref=e68]:
      - generic [ref=e69]:
        - generic [ref=e70]:
          - heading "Candidate Analysis Dashboard" [level=1] [ref=e71]
          - paragraph [ref=e72]: Showing 1 candidates matched against job description
        - button "Back to Upload" [ref=e74] [cursor=pointer]:
          - img [ref=e75]
          - text: Back to Upload
      - generic [ref=e77]:
        - generic [ref=e78]: RESUME ANALYSIS
        - table [ref=e80]:
          - rowgroup [ref=e81]:
            - row "CANDIDATE NAME MATCH SCORE EXPERIENCE SKILLS MATCH ACTIONS" [ref=e82]:
              - columnheader "CANDIDATE NAME" [ref=e83]
              - columnheader "MATCH SCORE" [ref=e84]
              - columnheader "EXPERIENCE" [ref=e85]
              - columnheader "SKILLS MATCH" [ref=e86]
              - columnheader "ACTIONS" [ref=e87]
          - rowgroup [ref=e88]:
            - row "Software Testing Engineer Test_enginer_resme.pdf 2.5 yr Reject View" [ref=e89]:
              - cell "Software Testing Engineer Test_enginer_resme.pdf" [ref=e90]:
                - generic [ref=e91]: Software Testing Engineer
                - generic [ref=e92]: Test_enginer_resme.pdf
              - cell [ref=e93]:
                - img [ref=e95]:
                  - generic [ref=e98]: 48%
              - cell "2.5 yr" [ref=e99]
              - cell "Reject" [ref=e100]:
                - generic [ref=e101]: Reject
              - cell "View" [ref=e102]:
                - button "View" [ref=e103] [cursor=pointer]
```