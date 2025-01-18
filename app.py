from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# OpenAI API configuration
openai.api_key = os.getenv('OPENAI_API_KEY')

# Define database models
class Issue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), default='Open')

# Create tables
with app.app_context():
    db.create_all()

@app.route('/api/issues', methods=['POST'])
def create_issue():
    data = request.json
    new_issue = Issue(
        title=data['title'],
        description=data['description'],
        department=data['department']
    )
    db.session.add(new_issue)
    db.session.commit()
    return jsonify({"message": "Issue created successfully"}), 201

@app.route('/api/suggestions', methods=['POST'])
def get_suggestions():
    data = request.json
    prompt = f"Given the following issue in the {data['department']} department: '{data['description']}', suggest 2-3 IT tools or technologies that could help solve this problem. Format the response as a JSON array of objects, each with 'tool' and 'description' keys."

    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=200,
        n=1,
        stop=None,
        temperature=0.7,
    )

    suggestions = eval(response.choices[0].text.strip())
    return jsonify(suggestions)

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    departments = db.session.query(Issue.department).distinct().all()
    dashboard_data = []

    for dept in departments:
        dept_name = dept[0]
        issue_count = Issue.query.filter_by(department=dept_name).count()
        resolved_count = Issue.query.filter_by(department=dept_name, status='Resolved').count()
        dashboard_data.append({
            "department": dept_name,
            "issueCount": issue_count,
            "resolvedCount": resolved_count
        })

    return jsonify(dashboard_data)

if __name__ == '__main__':
    app.run(debug=True)

