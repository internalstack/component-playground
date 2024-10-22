# Component Playground

This repository provides an example InternalStack app server that showcases every component.

## Getting Started

### Setup

1. **Obtain Your API Key**
   - Visit the InternalStack Cloud console and generate your API key.
   - (Optional:) Get a Google Maps API Key
2. **Configure Environment Variable**
   - Set the `INTERNALSTACK_API_KEY` environment variable with the API key you obtained.
   - (Optional:) Set the `GOOGLE_MAPS_API_KEY` environment variable
   - Example command for setting an environment variable:
     - **On macOS/Linux:**
       ```sh
       export INTERNALSTACK_API_KEY=your_api_key_here
       export GOOGLE_MAPS_API_KEY=your_api_key_here
       ```

### Installation and Running the Server

1. **Install Dependencies**
   - Open your terminal and navigate to the root directory of the project.
   - Run the following command to install the necessary packages:
     ```sh
     npm install
     ```

2. **Start the Server**
   - Run the server with this command:
     ```sh
     npm run start
     ```

## Additional Information

- Ensure your API key is kept secret and not committed to your version control.

