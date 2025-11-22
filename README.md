# ConvertEase - File Conversion Website

A user-friendly website featuring a variety of file conversion tools. Users can easily convert between different file formats with a simple, intuitive interface.

## Features

- **Multiple Conversion Tools:**
  - Photo and Video Compression
  - PDF to JPG Conversion
  - JPG to PDF Conversion
  - PDF to DOC/Word Conversion
  - DOC/Word to PDF Conversion
  - MP3 to MP4 Conversion

- **User-Friendly Interface:**
  - Drag and drop file upload
  - Progress indication
  - Simple conversion process
  - Immediate download of converted files

- **Responsive Design:**
  - Works on desktop and mobile devices
  - Clean and modern UI

## Project Structure

- `index.html` - Homepage with all conversion tools listed
- `styles.css` - Styling for the entire website
- `main.js` - Core JavaScript functionality for all pages
- Tool-specific pages:
  - `compress.html` - Photo and video compression
  - `pdf-to-jpg.html` - PDF to JPG conversion
  - `jpg-to-pdf.html` - JPG to PDF conversion
  - Other conversion pages follow the same pattern

## Running the Website

This is a static website that can be run locally without any build steps:

1. Clone the repository
2. Open `index.html` in your web browser

## Adding New Tools

To add a new conversion tool:

1. Create a new HTML file for the tool (use existing conversion pages as templates)
2. Add a new card to the tools grid in `index.html`
3. Update the `getOutputFileName` function in `main.js` to handle the new conversion type

## Implementation Notes

- This project is currently a frontend demonstration
- In a production environment, the actual file conversion would be handled by server-side processing
- The current implementation simulates conversions for demonstration purposes

## Future Improvements

- Add batch processing for multiple files
- Implement server-side conversion logic
- Add more advanced settings for each conversion type
- Implement user accounts for saving conversion history
- Add support for more file formats

## License

[MIT License](LICENSE)

## Credits

- Created by [Your Name]
- Icons by [Font Awesome](https://fontawesome.com/) 