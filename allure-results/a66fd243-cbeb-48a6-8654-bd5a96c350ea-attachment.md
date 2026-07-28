# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ExploratoryKAIResumeAnalysis.spec.js >> login test and check JD Analysis for single resume
- Location: tests\ExploratoryKAIResumeAnalysis.spec.js:7:1

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
    - generic [ref=e69]:
      - generic [ref=e70]:
        - generic [ref=e71]:
          - generic [ref=e72]: 👋
          - generic [ref=e73]:
            - generic [ref=e74]: Welcome to KAI
            - generic [ref=e75]: HR Intelligence
        - generic [ref=e76]: Upload a job description or paste a Linkedin profile to begin analysis
      - generic [ref=e77]:
        - generic [ref=e78]:
          - generic [ref=e79]:
            - generic [ref=e80]: Upload Job Description
            - generic [ref=e82]:
              - button "Trainee_Software_Tester_Job_Description 2.pdf 172.79 KB Remove file" [ref=e85] [cursor=pointer]:
                - generic [ref=e86]:
                  - img [ref=e87]
                  - generic [ref=e88]:
                    - generic [ref=e89]: Trainee_Software_Tester_Job_Description 2.pdf
                    - generic [ref=e90]: 172.79 KB
                - button "Remove file" [ref=e91]:
                  - img [ref=e93]
              - status [ref=e96]:
                - img [ref=e97]
                - generic [ref=e98]: File Uploaded
          - generic [ref=e99]:
            - generic [ref=e100]: Upload Resumes
            - generic [ref=e102]:
              - generic [ref=e104]:
                - button "Raveendra Reddy.docx 29.29 KB Remove file" [ref=e105] [cursor=pointer]:
                  - generic [ref=e106]:
                    - img [ref=e107]
                    - generic [ref=e108]:
                      - generic [ref=e109]: Raveendra Reddy.docx
                      - generic [ref=e110]: 29.29 KB
                  - button "Remove file" [ref=e111]:
                    - img [ref=e113]
                - button "+ Add More Resumes" [ref=e116] [cursor=pointer]:
                  - generic [ref=e117]: +
                  - text: Add More Resumes
              - status [ref=e118]:
                - img [ref=e119]
                - generic [ref=e120]: 1/5 resumes uploaded
        - button "Analyze Resumes" [disabled] [active] [ref=e122] [cursor=pointer]
```