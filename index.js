const url =
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let gameData;

const canvas = d3.select("#canvas");
const tooltip = d3.select("#tooltip");

const generateMap = () => {
    const hierarchy = d3
        .hierarchy(gameData, (item) => {
            return item.children;
        })
        .sum((item) => {
            return item.value;
        })
        .sort((item1, item2) => {
            return item2.value - item1.value;
        });

    const createTreeMap = d3.treemap().size([1000, 600]);

    createTreeMap(hierarchy);

    const gameTiles = hierarchy.leaves();

    const block = canvas
        .selectAll("g")
        .data(gameTiles)
        .enter()
        .append("g")
        .attr("transform", (item) => {
            return `translate(${item.x0}, ${item.y0})`;
        });

    block
        .append("rect")
        .attr("class", "tile")
        .attr("fill", (item) => {
            const category = item.data.category;
            switch (category) {
                case "2600":
                    return "SaddleBrown";
                    break;
                case "Wii":
                    return "Red";
                    break;
                case "NES":
                    return "DimGray";
                    break;
                case "GB":
                    return "Yellow";
                    break;
                case "DS":
                    return "MediumPurple";
                    break;
                case "X360":
                    return "Lime";
                    break;
                case "PS3":
                    return "DodgerBlue";
                    break;
                case "PS2":
                    return "SkyBlue";
                    break;
                case "SNES":
                    return "RebeccaPurple";
                    break;
                case "GBA":
                    return "Aqua";
                    break;
                case "PS4":
                    return "SteelBlue";
                    break;
                case "3DS":
                    return "Orange";
                    break;
                case "N64":
                    return "SeaGreen";
                    break;
                case "PS":
                    return "Silver";
                    break;
                case "XB":
                    return "Chartreuse";
                    break;
                case "PC":
                    return "Gold";
                    break;
                case "PSP":
                    return "RoyalBlue";
                    break;
                case "XOne":
                    return "ForestGreen";
                    break;
                default:
                    return "white";
            }
        })
        .attr("data-name", (item) => {
            return item.data.name;
        })
        .attr("data-category", (item) => {
            return item.data.category;
        })
        .attr("data-value", (item) => {
            return item.data.value;
        })
        .attr("width", (item) => {
            return item.x1 - item.x0;
        })
        .attr("height", (item) => {
            //codepen.io/your-work/
            https: return item.y1 - item.y0;
        })
        .on("mouseover", (item) => {
            tooltip.transition().style("visibility", "visible");

            let revenue = item.data.value;

            tooltip.html(`${item.data.name} revenue: $${revenue} million`);

            tooltip.attr("data-value", item.data.value);
        })
        .on("mouseout", (item) => {
            tooltip.transition().style("visibility", "hidden");
        });
    block
        .append("text")
        .attr("class", "game-name")
        .text((item) => {
            return item.data.name;
        })
        .attr("x", 5)
        .attr("y", 20)
        .style("font-size", "0.75rem");
};

d3.json(url).then((data, error) => {
    if (error) {
        console.log(error);
    } else {
        gameData = data;
        generateMap();
    }
});
