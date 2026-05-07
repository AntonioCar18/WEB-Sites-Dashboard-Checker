import google.generativeai as genai
import os

API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_diagnostic_report(errors):
    if not errors:
        return "No errors found. The system is functioning properly."

    prompt = f""" You are a diagnostic assistant. Analyze the following list of {errors} and generate a comprehensive diagnostic report. The report should include:"""

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"An error occurred while generating the diagnostic report: {str(e)}"

if __name__ == "__main__":
    sample_errors = [
        "Error 404: Page not found",
        "Error 500: Internal server error",
        "Error 403: Forbidden access"
    ]
    report = generate_diagnostic_report(sample_errors)
    print(report)