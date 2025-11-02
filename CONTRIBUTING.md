# 🤝 Contributing Guide

Thank you for considering contributing to the Sweet Shop Management System! This document provides guidelines and instructions for contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## Getting Started

### Prerequisites
- Node.js v16+
- MongoDB
- Git
- Code editor (VS Code recommended)

### Fork and Clone
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/sweetshop-management.git
cd sweetshop-management

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/sweetshop-management.git
```

### Install Dependencies
```bash
# Install all dependencies
npm run install-all

# Or install separately
cd BACKEND && npm install
cd ../FRONTEND/frontend && npm install
```

### Set Up Environment
```bash
# Copy environment files
cp BACKEND/.env.example BACKEND/.env

# Update with your local settings
```

## Development Workflow

### 1. Create a Branch
```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### Branch Naming Convention
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or updates
- `chore/` - Maintenance tasks

### 2. Make Changes
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes
```bash
# Run backend tests
cd BACKEND
npm test

# Test manually
npm run dev
```

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add sweet sorting feature"
```

### 5. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Coding Standards

### JavaScript/React Style Guide

#### General Rules
- Use ES6+ features
- Use `const` by default, `let` when reassignment needed
- Never use `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation

#### Naming Conventions
```javascript
// Variables and functions: camelCase
const userName = 'John';
function getUserData() {}

// Components: PascalCase
function SweetCard() {}

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:5000';

// Private functions: _prefixed
function _helperFunction() {}
```

#### File Structure
```javascript
// 1. Imports
import React from 'react';
import { useState } from 'react';

// 2. Constants
const MAX_ITEMS = 100;

// 3. Component
function MyComponent() {
  // 3.1. Hooks
  const [state, setState] = useState();
  
  // 3.2. Functions
  const handleClick = () => {};
  
  // 3.3. Effects
  useEffect(() => {}, []);
  
  // 3.4. Render
  return <div>...</div>;
}

// 4. Export
export default MyComponent;
```

#### React Best Practices
```javascript
// ✅ Good
function SweetCard({ sweet, onPurchase }) {
  return (
    <div className="sweet-card">
      <h3>{sweet.name}</h3>
      <button onClick={() => onPurchase(sweet.id)}>
        Purchase
      </button>
    </div>
  );
}

// ❌ Bad
function SweetCard(props) {
  return (
    <div className="sweet-card">
      <h3>{props.sweet.name}</h3>
      <button onClick={() => props.onPurchase(props.sweet.id)}>
        Purchase
      </button>
    </div>
  );
}
```

### Backend Style Guide

#### Express Route Structure
```javascript
// ✅ Good - Clear and organized
router.get('/', protect, getSweets);
router.post('/', protect, admin, createSweet);

// ❌ Bad - Inline functions
router.get('/', (req, res) => {
  // Long function body...
});
```

#### Error Handling
```javascript
// ✅ Good - Consistent error responses
try {
  const sweet = await Sweet.findById(id);
  if (!sweet) {
    return res.status(404).json({
      success: false,
      message: 'Sweet not found'
    });
  }
  res.status(200).json({ success: true, data: sweet });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message
  });
}

// ❌ Bad - Inconsistent responses
try {
  const sweet = await Sweet.findById(id);
  res.json(sweet);
} catch (error) {
  res.send('Error');
}
```

#### Async/Await
```javascript
// ✅ Good
export const getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json({ success: true, data: sweets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ❌ Bad - Promise chains
export const getSweets = (req, res) => {
  Sweet.find()
    .then(sweets => res.json(sweets))
    .catch(err => res.send(err));
};
```

## Testing Guidelines

### Writing Tests

#### Test Structure
```javascript
describe('Feature Name', () => {
  beforeAll(async () => {
    // Setup
  });

  afterAll(async () => {
    // Cleanup
  });

  describe('Specific Functionality', () => {
    it('should do something specific', async () => {
      // Arrange
      const data = { name: 'Test' };
      
      // Act
      const result = await someFunction(data);
      
      // Assert
      expect(result).toBeDefined();
      expect(result.name).toBe('Test');
    });
  });
});
```

#### Test Coverage Goals
- Aim for 80%+ code coverage
- Test all critical paths
- Test error cases
- Test edge cases

#### What to Test
- ✅ API endpoints
- ✅ Authentication/Authorization
- ✅ Database operations
- ✅ Business logic
- ✅ Error handling
- ❌ Third-party libraries
- ❌ Simple getters/setters

## Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Test additions or updates
- `chore` - Maintenance tasks

### Examples
```bash
# Feature
git commit -m "feat(sweets): add sorting by price"

# Bug fix
git commit -m "fix(auth): resolve token expiration issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# With body
git commit -m "feat(sweets): add image upload

- Add multer middleware
- Create upload endpoint
- Update Sweet model
- Add image validation"
```

### AI Co-authorship
When using AI tools, add co-author:
```bash
git commit -m "feat: implement user registration endpoint

Used an AI assistant to generate the initial boilerplate for the
controller and service, then manually added validation logic.


Co-authored-by: AI Tool Name <AI@users.noreply.github.com>"
```

## Pull Request Process

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Branch is up to date with main

### PR Title Format
Same as commit messages:
```
feat(sweets): add sorting functionality
fix(auth): resolve login redirect issue
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Edge cases tested

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

### Review Process
1. Automated tests run on PR
2. Code review by maintainer
3. Address feedback
4. Approval and merge

## Project Structure

### Adding New Features

#### Backend Feature
1. Create model in `BACKEND/src/models/`
2. Create controller in `BACKEND/src/controllers/`
3. Create routes in `BACKEND/src/routes/`
4. Add tests in `BACKEND/src/tests/`
5. Update documentation

#### Frontend Feature
1. Create component in `FRONTEND/frontend/src/components/`
2. Add to appropriate page
3. Update context if needed
4. Add API calls to services
5. Test responsiveness

## Common Tasks

### Adding a New API Endpoint
```javascript
// 1. Add to controller
export const newEndpoint = async (req, res) => {
  try {
    // Implementation
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Add to routes
router.get('/new-endpoint', protect, newEndpoint);

// 3. Add test
describe('GET /api/new-endpoint', () => {
  it('should return data', async () => {
    const res = await request(server)
      .get('/api/new-endpoint')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
  });
});
```

### Adding a New React Component
```javascript
// 1. Create component file
function NewComponent({ prop1, prop2 }) {
  return <div>...</div>;
}

export default NewComponent;

// 2. Import and use
import NewComponent from './components/NewComponent';

function ParentComponent() {
  return <NewComponent prop1="value" prop2="value" />;
}
```

## Getting Help

- Check existing issues and PRs
- Read the documentation
- Ask in discussions
- Contact maintainers

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Credited in commit history

Thank you for contributing! 🎉

---

**Last Updated:** November 1, 2025
