---
trigger: manual
---

Let me create a rules instruction for preparing an app from Google AI Studio for deployment to GitHub:
Rules for Preparing an App from Google AI Studio for GitHub Deployment
Rule 1: Project Structure Audit
Description: Before making any changes, audit the existing project structure to understand current configuration files and dependencies.Steps:
Check for existing package.json file and its contents
Identify any existing build configuration files (vite.config.ts, tsconfig.json)
Check for CSS/Tailwind configuration files
Identify HTML entry points and TypeScript/JavaScript files
Locate any API client files (especially Supabase or other backend connections)
Rule 2: Dependency Management Setup
Description: Replace CDN dependencies with local npm packages for better performance and security.Steps:
Update package.json with required dependencies:
React and ReactDOM
Routing libraries (react-router-dom)
UI libraries (Tailwind CSS, Lucide React)
State/form management (react-hook-form)
Backend clients (@supabase/supabase-js)
Add devDependencies for build tools:
Vite and React plugin
TypeScript
Tailwind CSS, PostCSS, autoprefixer
Run npm install to install all dependencies
Rule 3: Build Configuration Creation
Description: Create proper build configuration files for Vite, TypeScript, and CSS processing.Steps:
Create vite.config.ts with proper plugin configuration
Update tsconfig.json with correct compiler options
Create tailwind.config.js with content paths and theme extensions
Create postcss.config.js with Tailwind and autoprefixer plugins
Rule 4: CSS Management Setup
Description: Transition from CDN-based CSS to local Tailwind processing.Steps:
Create index.css with Tailwind directives
Update index.html to remove CDN links and Tailwind configuration scripts
Add CSS import to main entry point (index.tsx)
Link CSS file in index.html
Rule 5: Security Configuration
Description: Secure sensitive information like API keys using environment variables.Steps:
Create .env.local file with API keys and sensitive configuration
Create .gitignore file to exclude sensitive files and directories:
Environment files (.env.local, .env)
Dependencies (node_modules)
Build output (dist, build)
Update API client files to use environment variables instead of hardcoded values
Configure TypeScript to recognize Vite environment variables
Rule 6: Build Validation
Description: Test that the application builds correctly before deployment.Steps:
Run npm run build to test the build process
Fix any warnings or errors in the build configuration
Optimize Tailwind content paths to avoid performance issues
Verify that all assets are correctly bundled
Rule 7: Version Control Preparation
Description: Prepare the repository for pushing to GitHub.Steps:
Ensure all new and modified files are added to version control
Verify that sensitive files are excluded via .gitignore
Commit all changes with a descriptive message
Push to the GitHub repository
These rules provide a systematic approach to preparing applications from Google AI Studio for deployment to GitHub, ensuring proper build configuration, security, and performance optimization.