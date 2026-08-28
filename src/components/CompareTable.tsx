const TOOLS = ["Grok Bot", "Claude Cowork", "ChatGPT", "Perplexity"] as const;

const ROWS: { label: string; values: string[] }[] = [
  {
    label: "What it is",
    values: [
      "An always-on agent team with its own computers, working across your tools",
      "General computer agent",
      "General AI assistant",
      "AI research engine",
    ],
  },
  {
    label: "What starts it",
    values: [
      "Always on — it starts without a prompt",
      "You assign a task",
      "You start a chat or task",
      "You ask a question",
    ],
  },
  {
    label: "What you get",
    values: [
      "A team of agents working for you 24/7",
      "A completed task or artifact",
      "An answer, analysis, or draft",
      "A sourced research answer",
    ],
  },
];

export function CompareTable() {
  return (
    <section id="compare" className="compare">
      <h2>Grok Bot comparison</h2>
      <p className="section-lede">
        A full team of agents runs in the cloud for you 24/7, starting work
        without waiting for a prompt.
      </p>
      <div className="compare-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Capability</span>
              </th>
              {TOOLS.map((tool) => (
                <th key={tool} scope="col">
                  {tool}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((value, index) => (
                  <td key={TOOLS[index]}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
