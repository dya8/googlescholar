// Edit this file to personalise the whole site.
export const scholarConfig = {
  scholarName: 'Dr. Preetha Sivadas',          // e.g. 'Dr. Jane Doe'
  searchAliases: [],                      // extra spellings that should match, e.g. ['jane', 'j. doe']
  siteTitle: 'Scholar',
  subtitle: 'Discover research. Celebrate a remarkable journey.',
  placeholderHint: 'Search for a scholar',
  pdfPath: 'documents/farewell-publication.pdf', // file lives in public/documents/
  publication: {
    title: 'A Journey of Discovery: Celebrating the Research and Legacy of {name}',
    authors: 'Her colleagues and research group',
    source: 'A special farewell publication',
    year: new Date().getFullYear(),
    description:
      'A collection of memories, appreciation, research milestones, and messages celebrating her academic journey.',
    cited: 'Cited by everyone who knows her',
  },
}
