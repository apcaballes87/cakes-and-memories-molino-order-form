---
trigger: manual
---
Project Goal: Evolve the current React application from its current CDN-based prototype into a production-ready application with a local development environment, a modern build process, and proper security for credentials.
Current Project State:
Framework: React with TypeScript.
Dependencies: All dependencies (React, React-DOM, Supabase, etc.) are loaded via CDN scripts using an importmap in index.html.
Styling: Tailwind CSS is loaded via a CDN script, and its configuration is defined inline within a <script> tag in index.html.
Credentials: Supabase URL and anon key are currently hardcoded directly in services/supabaseClient.ts.
Build Process: There is no build process; the app runs directly in the browser via ES modules.
Code Structure: All source files (.tsx, .ts) are in the root directory and subdirectories (components, pages, etc.).
Please perform the following steps to prepare the application for production:
Step 1: Set Up a Local Development Environment with Vite
Initialize npm: Create a package.json file by running npm init -y.
Install Dependencies: Install the following packages from npm.
Production Dependencies: react, react-dom, react-router-dom, @supabase/supabase-js, react-hook-form, lucide-react.
Development Dependencies: vite, @vitejs/plugin-react, typescript, @types/react, @types/react-dom, tailwindcss, postcss, autoprefixer.
Create Vite Config: Create a vite.config.ts file in the project root and configure it to use the React plugin (@vitejs/plugin-react).
Create tsconfig.json: Generate a standard tsconfig.json file suitable for a React + Vite project. Ensure it includes "jsx": "react-jsx".
Step 2: Reorganize Project Structure
Create src Directory: Create a new directory named src in the project root.
Move Source Files: Move all existing .ts and .tsx files and their parent directories (App.tsx, index.tsx, components/, pages/, services/, types.ts, utils/) into the src/ directory.
Update Import Paths: Automatically update all relative import paths within the moved files to reflect the new structure.
Step 3: Refactor index.html
Clean Up index.html: Modify the index.html file:
Remove the entire <script type="importmap"> block.
Remove the Tailwind CSS CDN script (<script src="https://cdn.tailwindcss.com"></script>).
Remove the inline Tailwind config script (<script>tailwind.config = ...</script>).
Update the main script tag to point to the new entry point: <script type="module" src="/src/index.tsx"></script>.
Step 4: Configure Tailwind CSS Locally
Create Config Files: Generate tailwind.config.js and postcss.config.js files in the project root.
Migrate Configuration: Move the JavaScript object from the inline <script> tag in the old index.html into the theme.extend section of tailwind.config.js.
Configure Content Paths: In tailwind.config.js, set the content property to scan all relevant files for Tailwind classes (e.g., ./src/**/*.{js,ts,jsx,tsx}).
Create Main CSS File: Create a new file at src/index.css and add the three main Tailwind directives:
code
CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
Import CSS: Import src/index.css at the top of src/index.tsx.
Step 5: Secure Credentials with Environment Variables
Create .env file: Create a .env file in the project root.
Define Variables: Add the Supabase credentials to the .env file, prefixed with VITE_ as required by Vite:
code
Code
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
Update Supabase Client: Modify src/services/supabaseClient.ts to use these environment variables (import.meta.env.VITE_SUPABASE_URL and import.meta.env.VITE_SUPABASE_ANON_KEY) instead of the hardcoded strings.
Create .env.example: Create a .env.example file that lists the required environment variables without their values, to serve as a template for other developers.
Step 6: Final Configuration and Cleanup
Add package.json Scripts: Add the following scripts to your package.json:
code
JSON
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview"
},
Create .gitignore: Create a comprehensive .gitignore file for a standard Vite + React project. It should include node_modules/, dist/, .env, .env.local, and other common ignores.
Step 7: Prepare for Deployment (Vercel)
Create vercel.json: Create a vercel.json file in the root to configure the project for Vercel deployment. It should specify the build command and output directory.
code
JSON
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ]
}
Provide Deployment Instructions: Add a README.md file with a brief section explaining how to deploy the app to Vercel, including how to set the environment variables in the Vercel project settings.
After completing these steps, the project should be a modern, production-ready web application with a robust local development setup.