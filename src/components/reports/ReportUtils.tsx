
// Utility functions for report generation and handling

/**
 * Generates sample report content based on report metadata
 */
export const generateSampleReportContent = (report: {id: number; name: string; date: string; project: string}) => {
  return `# ${report.name}
Project: ${report.project}
Date: ${report.date}

## Summary
This is a sample report for demonstration purposes.

## Project Progress
- Foundation work: 100% complete
- Structural framing: 75% complete
- Electrical: 45% complete
- Plumbing: 50% complete

## Weather Conditions
Clear skies, temperature 72°F, no precipitation

## Labor Hours
- Carpenters: 64 hours
- Electricians: 32 hours
- Plumbers: 40 hours
- General Labor: 80 hours

## Materials Used
- Concrete: 12 cubic yards
- Steel: 2.5 tons
- Lumber: 1,200 board feet

## Safety Incidents
No incidents reported.

## Notes
Work progressing according to schedule. No major issues to report.
`;
};

/**
 * Handles report download by creating a text file and triggering download
 */
export const downloadReport = (report: {name: string; content: string}) => {
  const blob = new Blob([report.content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${report.name.replace(/\s+/g, "_")}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
