# CLAUDE.md - Condor Project

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CONFIDENTIALITY NOTICE

**This project is subject to a Non-Disclosure Agreement (NDA).** Due to confidentiality restrictions, specific implementation details, proprietary algorithms, data sources, and model architectures cannot be disclosed in detail. Any assistance provided must respect these confidentiality boundaries.

## Project Overview

Condor is a machine learning research repository focused on financial data analysis and prediction, specifically targeting S&P 500 (^GSPC) market forecasting. The codebase represents an advanced quantitative finance system combining traditional economic indicators with modern deep learning approaches.

### High-Level Architecture

Due to NDA restrictions, only general architectural patterns can be described:

- **Data Pipeline**: Multi-source financial data ingestion and preprocessing
- **ML Models**: Multiple neural network implementations with ensemble methods  
- **Web Interface**: Real-time visualization and API endpoints
- **Utility Libraries**: Modular components for ML, PyTorch, and general utilities

## Project Structure

This is a machine learning research repository focused on financial data analysis and prediction, specifically for S&P 500 (^GSPC) data. The codebase contains multiple versions of ML models and utility libraries:

### Core Components

- **app.py**: Flask web application that serves financial data visualization with Plotly charts. Reads JSON data from `/home/shared/condor/condor_data/final_data/splitted_data` and provides REST API endpoints.

- **Utility Libraries** (installable Python packages):
  - `coding_utils/`: General purpose utilities for S3, database connections, file handling, debugging
  - `ml_utils/`: Machine learning utilities and model metrics
  - `pytorch_utils/`: PyTorch neural network utilities (LSTM, GRU implementations)

- **ML Model Versions**:
  - `condor_ml_v0/`, `condor_ml_v1/`, `condor_ml_v1.1/`: Evolution of the core ML models
  - `graham_v2/`, `graham_v3/`, `graham_v4/`: Alternative model implementations
  - All contain similar structure: `run.py`, `base_model.py`, `frac_net.py`, `iterate.py`

- **Data Pipeline**:
  - `condor_data/`: Financial data collection and processing
  - `condor_data/parsing_data/`: API data collection scripts
  - `condor_data/final_data/`: Processed data storage and splitting utilities

## Development Commands

### Python Package Installation
For the utility packages, use editable installs:
```bash
pip install -e coding_utils/
pip install -e ml_utils/
pip install -e pytorch_utils/
```

### Running the Web Application
```bash
python app.py
# Serves on http://0.0.0.0:5001 with debug=True
```

### Makefile Commands
```bash
make clean          # Remove Python cache files, temp files, conflict files
make com            # Git commit with "minor edits" message and push
make ls_git         # List all files tracked by git
```

### Dependencies
Each component has its own `requirements.txt`:
- `coding_utils/`: boto3, pandas, numpy, sklearn, s3 utilities
- `ml_utils/`: sklearn
- `pytorch_utils/`: torch, coding_utils

## Architecture Notes

### Data Flow
1. Financial data is collected via APIs in `condor_data/parsing_data/`
2. Data is processed and split into time-based JSON files in `condor_data/final_data/splitted_data/YYYY_MM_DD/HH:MM.json`
3. Each JSON contains `^GSPC_Close` and `prediction` fields
4. Flask app serves this data via `/api/data` endpoint with date filtering
5. Frontend renders interactive Plotly charts comparing close prices vs predictions

### Model Architecture
- Multiple neural network implementations using PyTorch
- Custom LSTM/GRU cells with encoder patterns
- Fractional combining approaches (`frac_combine.py`, `frac_net.py`)
- Model iteration and training utilities in `iterate.py` files

### Key Data Structures
- Time series financial data stored as JSON with timestamp keys
- Models expect input features and produce single prediction values
- Data is organized by date folders (YYYY_MM_DD format)

## Research & Development Guidelines

### Model Development
- Focus on incremental improvements rather than complete rewrites
- Maintain backward compatibility with existing data formats
- Document performance metrics and validation results
- Use proper train/validation/test splits with temporal awareness

### Code Organization
- Each model version should be self-contained
- Shared utilities belong in the respective utility packages
- Maintain consistent naming conventions across versions
- Include comprehensive logging for debugging and monitoring

### Testing & Validation
- Backtest all models on historical data before deployment
- Implement walk-forward validation for time series data
- Monitor for overfitting and concept drift
- Validate against benchmark models and market indicators

## Confidentiality Reminders

When working with this codebase:
- Do not share specific model parameters, weights, or training data
- Avoid discussing proprietary feature engineering techniques
- Keep performance metrics and trading results confidential
- Maintain discretion regarding data sources and partnerships
- Ensure all communications respect NDA obligations

## Technology Stack

**Core Technologies:**
- Python 3.x with scientific computing stack
- PyTorch for deep learning implementations
- Flask for web application framework
- Plotly for interactive financial visualizations
- Pandas/NumPy for data manipulation

**Infrastructure:**
- AWS S3 for data storage
- PostgreSQL for structured data
- Redis for caching (if applicable)
- Docker for containerization (if applicable)

**Machine Learning:**
- Time series forecasting models
- Ensemble methods and model stacking
- Custom neural network architectures
- Feature engineering pipelines

## Best Practices

1. **Version Control**: Each significant model iteration should be in its own versioned directory
2. **Documentation**: Update this file when adding new components or changing architecture
3. **Security**: Never commit sensitive data, API keys, or model weights to version control
4. **Performance**: Profile code regularly and optimize bottlenecks
5. **Reproducibility**: Use random seeds and document environment requirements

---

*This documentation is subject to the same confidentiality restrictions as the codebase itself. Handle accordingly.*