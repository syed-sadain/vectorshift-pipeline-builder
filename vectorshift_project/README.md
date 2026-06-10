# VectorShift Pipeline Builder — Frontend Technical Assessment

A fully-featured pipeline builder with drag-and-drop nodes, built with React + ReactFlow on the frontend and FastAPI on the backend.

## Features

### Part 1 — Node Abstraction
All nodes use a shared `BaseNode` component (`/frontend/src/nodes/BaseNode.js`) that provides:
- Consistent styling and layout
- Configurable title, icon, and accent color
- Automatic handle placement for inputs and outputs
- `NodeField` helper for labeled form rows

**9 nodes total:** Input, Output, LLM, Text, API Request, Filter, Transform, Merge, Note

### Part 2 — Styling
Dark-themed UI with:
- Sidebar toolbar with categorized, draggable node tiles
- Per-node accent colors matching their function
- Dark canvas with dot grid, MiniMap, and Controls
- Smooth hover/focus transitions throughout

### Part 3 — Text Node Logic
- **Auto-resize:** the textarea grows in width and height as text is entered
- **Variable handles:** `{{varName}}` patterns are detected and rendered as target handles on the left side of the node in real-time

### Part 4 — Backend Integration
- Submit button POSTs the current nodes + edges as JSON to `POST /pipelines/parse`
- Backend calculates `num_nodes`, `num_edges`, and `is_dag` (using Kahn's topological sort)
- Alert shows the results in a human-readable format

---

# VectorShift Pipeline Builder — Frontend Technical Assessment

A modern visual pipeline builder built with **React**, **ReactFlow**, and **FastAPI**. This project demonstrates scalable node architecture, polished UI design, dynamic text-node behavior, and frontend–backend integration for pipeline validation.

---

## 🚀 Project Overview

This assessment implements all four required parts:

- **Node Abstraction** — A reusable node architecture that makes creating and maintaining nodes fast and scalable.
- **Styling** — A cohesive, modern dark-themed interface with responsive and interactive UI elements.
- **Text Node Logic** — Auto-resizing text nodes with dynamic variable detection and handle generation.
- **Backend Integration** — Submission of pipelines to a FastAPI backend for node/edge analysis and DAG validation.

---

## ✨ Features

### Part 1 — Scalable Node Abstraction

All nodes are built on top of a shared **BaseNode** component located at:

```text
/frontend/src/nodes/BaseNode.js
```

The abstraction provides:

- Consistent node layout and styling
- Configurable title, icon, and accent color
- Automatic input/output handle placement
- Reusable NodeField helper for labeled form controls
- Minimal boilerplate when creating new nodes
- Easy maintenance and scalability

#### Included Nodes

**Core Nodes**
- Input Node
- Output Node
- LLM Node
- Text Node

**Additional Nodes**
- API Request Node
- Filter Node
- Transform Node
- Merge Node
- Note Node

**Total: 9 Node Types**

These additional nodes demonstrate the flexibility and extensibility of the shared node architecture.

---

### Part 2 — Unified UI & Styling

The application features a modern dark-themed interface designed to improve usability and visual consistency.

#### UI Enhancements

- Dark canvas workspace
- Dot-grid background
- Sidebar toolbar with draggable node cards
- Consistent node styling across all node types
- Unique accent colors per node category
- ReactFlow MiniMap
- Zoom and navigation controls
- Smooth hover and transition effects
- Responsive spacing and layout

The styling system is centralized, making future design updates simple and maintainable.

---

### Part 3 — Advanced Text Node Logic

The Text Node includes two dynamic enhancements.

#### Auto-Resizing Text Area

As users type more content, the Text Node automatically expands in width and height, improving readability without requiring manual resizing.

#### Dynamic Variable Detection

Variables written in the following format:

```text
{{variableName}}
```

are automatically detected and converted into input handles.

#### Example

```text
Hello {{username}}

Your email is {{email}}

Your token is {{token}}
```

Automatically generates input handles for:

- username
- email
- token

This behavior updates in real time as users edit the text.

---

### Part 4 — Backend Integration

The frontend is fully integrated with the FastAPI backend.

#### Frontend

When the **Submit** button is clicked:

- All nodes are collected
- All edges are collected
- Pipeline data is serialized into JSON
- Data is sent to the backend endpoint

```http
POST /pipelines/parse
```

#### Backend

The backend processes the pipeline and returns:

- Total number of nodes
- Total number of edges
- Whether the graph forms a Directed Acyclic Graph (DAG)

#### DAG Validation

DAG detection is implemented using **Kahn's Topological Sorting Algorithm**.

#### Example Response

```json
{
  "num_nodes": 8,
  "num_edges": 7,
  "is_dag": true
}
```

#### User Feedback

After receiving the response, the frontend displays a user-friendly alert containing:

- Number of Nodes
- Number of Edges
- DAG Status

---

## 🛠️ Technology Stack

### Frontend

- React
- ReactFlow
- JavaScript (ES6+)
- CSS

### Backend

- Python 3.9+
- FastAPI
- Uvicorn

---

## 📁 Project Structure

```text
frontend/
│
├── src/
│   ├── nodes/
│   │   ├── BaseNode.js
│   │   ├── InputNode.js
│   │   ├── OutputNode.js
│   │   ├── LLMNode.js
│   │   ├── TextNode.js
│   │   ├── ApiRequestNode.js
│   │   ├── FilterNode.js
│   │   ├── TransformNode.js
│   │   ├── MergeNode.js
│   │   └── NoteNode.js
│   │
│   ├── submit.js
│   └── ...
│
backend/
│
├── main.py
└── ...
```

---

## ▶️ Running the Application

### Prerequisites

Before running the project, ensure the following are installed:

- Node.js (v18+ recommended)
- npm
- Python 3.9+
- pip

---

### Frontend Setup   [Take 1 terminal]

Navigate to the frontend directory and install dependencies:

```bash
cd vectorshift_project 
cd frontend
npm install
npm start
```
Frontend URL:

```text
http://localhost:3000
```

---

### Backend Setup [take 2 teminal]

Navigate to the backend directory:

```bash
cd vectorshift_project 
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```
Backend URL:

```text
http://localhost:8000
```

---

### Verify the Application

1. Start the backend server.
2. Start the frontend server.
3. Open `http://localhost:3000`.
4. Drag nodes from the sidebar onto the canvas.
5. Connect nodes to build a pipeline.
6. Use Text Nodes with `{{variable}}` syntax to create dynamic handles.
7. Click **Submit**.
8. View the analysis alert returned by the backend.

---

## 🔄 Application Workflow

```text
User Creates Pipeline
         │
         ▼
Frontend Collects Nodes & Edges
         │
         ▼
POST /pipelines/parse
         │
         ▼
FastAPI Processes Graph
         │
         ├── Count Nodes
         ├── Count Edges
         └── Validate DAG
         │
         ▼
Returns JSON Response
         │
         ▼
Frontend Displays Results
```

Example response:

```json
{
  "num_nodes": 9,
  "num_edges": 8,
  "is_dag": true
}
```

---

## 📌 Assessment Requirements Coverage

### ✅ Part 1 — Node Abstraction

- Created reusable BaseNode component
- Reduced duplicate code across nodes
- Added five additional node types
- Demonstrated scalability and maintainability

### ✅ Part 2 — Styling

- Designed a cohesive dark-themed UI
- Added responsive layouts and transitions
- Improved overall user experience

### ✅ Part 3 — Text Node Logic

- Implemented auto-resizing text node
- Added dynamic variable detection
- Generated handles in real time from variables

### ✅ Part 4 — Backend Integration

- Connected frontend to FastAPI backend
- Implemented pipeline submission
- Added node and edge counting
- Implemented DAG validation
- Displayed backend results to users

---

## 🎯 Design Goals

The primary objectives of this implementation were:

- Scalability
- Reusability
- Maintainability
- User Experience
- Clean Architecture
- Extensibility for future node types

The resulting system makes it easy to introduce new nodes, update styling globally, and extend pipeline functionality without significant code duplication.

---

## 👤 Author

**Syed Sadain**

Submitted as part of the **VectorShift Frontend Technical Assessment**.

For any questions regarding the assessment:

recruiting@vectorshift.ai

---

## 📄 License

This project was developed solely for the VectorShift technical assessment and is intended for evaluation purposes.
