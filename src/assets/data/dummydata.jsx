const dummynodes = [
  {
    id: "n-1",
    label: "1",
  },
  {
    id: "n-2",
    label: "2",
  },
  {
    id: "n-3",
    label: "3",
  },
  {
    id: "n-4",
    label: "4",
  },
  {
    id: "n-5",
    label: "5",
  },
  {
    id: "n-6",
    label: "6",
  },
  {
    id: "n-7",
    label: "7",
  },
  {
    id: "n-8",
    label: "8",
  },
  {
    id: "n-9",
    label: "9",
  },
  {
    id: "n-10",
    label: "10",
  },
];

const dummyedges = [
  {
    id: "E-n-1->n-2",
    source: "n-1",
    target: "n-2",
    label: "Edge n-1-n-2",
  },
  {
    id: "E-n-1->n-3",
    source: "n-1",
    target: "n-3",
    label: "Edge n-1-n-3",
  },
  {
    id: "E-n-4->n-1",
    source: "n-4",
    target: "n-1",
    label: "Edge n-4-n-1",
  },
  {
    id: "E-n-7->n-4",
    source: "n-7",
    target: "n-4",
    label: "Edge n-7-n-4",
  },
  {
    id: "E-n-6->n-5",
    source: "n-6",
    target: "n-5",
    label: "Edge n-6-n-5",
  },
  {
    id: "E-n-7->n-5",
    source: "n-7",
    target: "n-5",
    label: "Edge n-7-n-5",
  },
  {
    id: "E-n-2->n-5",
    source: "n-2",
    target: "n-5",
    label: "Edge n-2-n-5",
  },
  {
    id: "E-n-1->n-7",
    source: "n-1",
    target: "n-7",
    label: "Edge n-1-n-7",
  },
  {
    id: "E-n-8->n-9",
    source: "n-8",
    target: "n-9",
    label: "Edge n-8-n-9",
  },
  {
    id: "E-n-9->n-10",
    source: "n-9",
    target: "n-10",
    label: "Edge n-9-n-10",
  },
  {
    id: "E-n-9->n-7",
    source: "n-9",
    target: "n-7",
    label: "Edge n-9-n-7",
  },
];

export { dummynodes, dummyedges };
