# Internshala Automation

# Automated Internship Application Script

## Overview

This script automates the process of applying for multiple internships on the Internshala platform according to your preferences. It saves time by filtering internships based on your criteria and applying to them without the need for repetitive tasks like uploading your resume or answering assessment questions.

## Features

- **Preference-Based Filtering**: Filter internships based on your preferences such as location, industry, role, and more.
- **Automated Applications**: Automatically apply to selected internships.
- **Resume Upload Automation**: Upload your resume automatically to each internship application.
- **Assessment Question Handling**: Automatically handle and submit assessment questions if required.

## Getting Started

To use this script, follow these steps:

### Prerequisites

- Python 3.x
- `requests` library
- `beautifulsoup4` library
- `selenium` library
- WebDriver (e.g., ChromeDriver for Google Chrome)

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/keerat15/internshala.automation
    cd internshala-automation
    ```

2. **Install Required Packages**

    Create a virtual environment (optional) and install the dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. **Download WebDriver**

    Download the appropriate WebDriver for your browser and place it in the project directory. [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) is recommended for Chrome.

### Configuration

1. **Update Preferences**

    Edit the `config.json` file to include your internship preferences:

    ```json
    {
        "location": "Your Preferred Location",
        "role": "Desired Role",
        "industry": "Preferred Industry",
        "other_preferences": "Other Criteria"
    }
    ```

2. **Resume File**

    Ensure your resume file is named `resume.pdf` and placed in the `resume` directory.

### Usage

1. **Run the Script**

    Execute the script with the following command:

    ```bash
    python apply_internships.py
    ```

2. **Monitor Progress**

    The script will output the progress and any issues encountered during the application process.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please submit a pull request or open an issue.

## Contact

For any questions or support, please reach out to me via [email](dhani.harkeerat@gmail.com).
