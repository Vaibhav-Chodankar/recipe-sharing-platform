<h1>Recipe Sharing Platform</h1>

<p>A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that allows users to share, discover, and manage recipes. The platform includes features like user authentication, recipe management, recipe discovery, user interactions (commenting, liking, creating collections), and more.</p>

<h2>Installation Guide</h2>

<h3>Requirements</h3>
<ul>
  <li><strong>Node.js</strong> should be installed on your machine.</li>
  <li><strong>MongoDB</strong> should be installed and running on your machine.</li>
</ul>

<h3>Installation Steps</h3>

<ol>
  <li><strong>Clone the repository:</strong>
    <pre>
<code>git clone https://github.com/Vaibhav-Chodankar/recipe-sharing-platform.git
cd recipe-sharing-platform</code>
    </pre>
  </li>
  <li><strong>Frontend Setup:</strong>
    <p>Navigate to the frontend directory and install the necessary dependencies:</p>
    <pre>
<code>cd frontend
npm install
npm run dev</code>
    </pre>
    <p>The frontend will start in development mode. Usually, it runs on <code>http://localhost:5173</code>.</p>
  </li>
  <li><strong>Backend Setup:</strong>
    <p>Open another terminal window and navigate to the backend directory to set up the server:</p>
    <pre>
<code>cd backend
npm install
npm start</code>
    </pre>
    <p>The backend server will start running on <code>http://localhost:5000</code>.</p>
  </li>
</ol>

<p>Now, your development environment is set up, and both the frontend and backend should be running simultaneously.</p>

<h2>Backend Features</h2>

<p>The backend is built using <strong>Node.js</strong> with <strong>Express.js</strong> and <strong>MongoDB</strong> for data storage. Below is a detailed description of all the features:</p>

<h3>1. User Authentication</h3>
<ul>
  <li><strong>Register:</strong> Allows users to create an account with a unique email and password.</li>
  <li><strong>Login:</strong> Authenticates users using their email and password.</li>
  <li><strong>JWT Tokens:</strong> Used to secure routes and manage user sessions.</li>
  <li><strong>Middleware for Authentication:</strong> Protects routes to ensure only authenticated users can access them.</li>
</ul>

<h3>2. Recipe Management</h3>
<ul>
  <li><strong>Create a Recipe:</strong> Authenticated users can add new recipes with details like title, description, ingredients, steps, category, and image (Image stored in the database is in base64 format).</li>
  <li><strong>Update Recipe:</strong> Users can update their own recipes.</li>
  <li><strong>Delete Recipe:</strong> Users can delete their own recipes.</li>
  <li><strong>Get All Recipes:</strong> Public API to retrieve all recipes, with pagination support.</li>
  <li><strong>Get Recipe by ID:</strong> Retrieve detailed information about a single recipe using its ID.</li>
</ul>

<h3>3. Recipe Search and Filtering</h3>
<ul>
  <li><strong>Search Recipes:</strong> Allows searching recipes by name.</li>
  <li><strong>Filter Recipes:</strong> Allows filtering recipes by categories like 'Appetizers', 'Desserts', 'Vegan', etc.</li>
</ul>

<h3>4. User Collections Management</h3>
<ul>
  <li><strong>Create Collection:</strong> Users can create custom collections for organizing recipes.</li>
  <li><strong>Add Recipe to Collection:</strong> Users can add recipes to their collections.</li>
  <li><strong>Get All Collections:</strong> Fetchs all collections created by a user and displays them into tabs.</li>
</ul>

<h3>5. User Interactions</h3>
<ul>
  <li><strong>Comment on Recipes:</strong> Authenticated users can comment on recipes.</li>
  <li><strong>Like Recipes:</strong> Users can like recipes, and the total number of likes is displayed.</li>
  <li><strong>Save Recipes to Collection:</strong> Users can add recipes to their favorite list of collection.</li>
</ul>

<h3>6. Error Handling and Validation</h3>
<ul>
  <li><strong>Error Responses:</strong> Comprehensive error handling for validation errors, authentication errors, and server errors.</li>
  <li><strong>Input Validation:</strong> Middleware to validate user input and ensure data consistency.</li>
</ul>

<h2>Frontend Features</h2>

<p>The frontend is built using <strong>React.js</strong> with <strong>React Router</strong> for navigation and <strong>Axios</strong> for API requests.</p>

<h3>1. Home Page</h3>
<ul>
  <li><strong>Recipe Discovery:</strong> Displays a list of all recipes fetched from the backend, sorted by the latest added recipes by default with pagination.</li>
  <li><strong>Search Bar:</strong> Allows users to search for recipes by name.</li>
  <li><strong>Category Filter:</strong> Dropdown to filter recipes based on categories.</li>
</ul>

<h3>2. User Authentication</h3>
<ul>
  <li><strong>Login Page:</strong> Allows existing users to log in with email and password.</li>
  <li><strong>Register Page:</strong> Allows new users to sign up for the platform.</li>
</ul>

<h3>3. Recipe Management</h3>
<ul>
  <li><strong>Add New Recipe:</strong> Authenticated users can add new recipes using a form with fields like title, description, ingredients, steps, category, and image upload (In frontend image in converted into base64 format string and sent to backend to store in database).</li>
  <li><strong>Edit Recipe:</strong> Users can edit their existing recipes.</li>
  <li><strong>Delete Recipe:</strong> Users can delete their own recipes.</li>
</ul>

<h3>4. Recipe Details Page</h3>
<ul>
  <li><strong>Recipe Information:</strong> Displays detailed information about a specific recipe, including ingredients, steps, category, likes, and comments.</li>
  <li><strong>Comments Section:</strong> Allows authenticated users to add comments and view existing comments.</li>
  <li><strong>Like Button:</strong> Users can like a recipe, and the total number of likes is displayed.</li>
</ul>

<h3>5. User Collections</h3>
<ul>
  <li><strong>View Collections:</strong> A section where users can view all their collections.</li>
  <li><strong>Create New Collection:</strong> Users can create new collections for grouping recipes.</li>
  <li><strong>Add Recipes to Collection:</strong> Users can add recipes to their existing collections.</li>
  <li><strong>Collection Tabs:</strong> Displays collections in a tab format, where clicking a tab shows the recipes within that collection.</li>
</ul>

<h3>6. Responsive Design</h3>
<ul>
  <li><strong>Mobile-Friendly:</strong> The platform is built using bootstrap and it is fully responsive and works seamlessly on all screen sizes, from desktops to smartphones.</li>
</ul>

<h2>Conclusion</h2>
<p>The <strong>Recipe Sharing Platform</strong> offers a comprehensive solution for users to discover, manage, and share recipes.</p>
