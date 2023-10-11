export async function GET(): Promise<Response> {
  const res = await fetch(
    "https://manual-case-study.herokuapp.com/questionnaires/6-part.json",
    // Below is another endpoint
    // "https://manual-case-study.herokuapp.com/questionnaires/972423.json",
  );

  return res;
}
