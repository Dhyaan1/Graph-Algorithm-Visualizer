const theme = {
  canvas: { background: "#201E1F" },
  node: {
    fill: "#451F55",
    activeFill: "#EE2677",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.8,
    label: {
      color: "#fff",
      stroke: "#201E1F",
      activeColor: "#FFF275",
    },
    subLabel: {
      color: "#ddd",
      stroke: "transparent",
      activeColor: "#1DE9AC",
    },
  },
  lasso: {
    border: "1px solid #55aaff",
    background: "rgba(75, 160, 255, 0.1)",
  },
  ring: {
    fill: "#D8E6EA",
    activeFill: "#1DE9AC",
  },
  edge: {
    fill: "#2b4570",
    activeFill: "#E49273",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      stroke: "#201E1F",
      color: "#F2C14E",
      activeColor: "#1DE9AC",
      fontSize: 6,
    },
  },
  arrow: {
    fill: "#2b4570",
    activeFill: "#E49273",
  },
  cluster: {
    stroke: "#D8E6EA",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      stroke: "#fff",
      color: "#2A6475",
    },
  },
};

export default theme;
