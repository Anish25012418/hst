// Updates an array of file paths by inserting 'cover' after 'home' in the path and prepending a given variable to the file names.
const updateHomePaths = (paths, variable) => {
  return paths.map((path) => {
    const segments = path.split('/');
    const homeIndex = segments.indexOf('home');

    if (homeIndex !== -1) {
      segments.splice(homeIndex + 1, 0, 'cover');
    }

    // Modify the file name by adding the variable in front of it
    const fileName = segments.pop();
    const updatedFileName = `${variable}_${fileName}`;
    segments.push(updatedFileName);

    return segments.join('/');
  });
};

module.exports = {
  updateHomePaths
}