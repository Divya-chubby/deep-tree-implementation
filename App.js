import React from "react";

function App() {
    const svgRef = React.useRef(null);
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    const treeLayout = tree().size([height,width]);
    React.useEffect(()=>{
        const svg = select(svgRef.current);
        //clear svg content before addingnew elements
        svg.selectAll("*").remove();

        //clear svg and add width and height
        svg.attr('width',width).attr('height',height);

        //make a ajax call for data to display in d3.js tree graph
        json("/data.json").then((data)=> {
          const root = hierarchy(data);
          const paths = treeLayout(root).links();
          const pathGenerator = linkHorizontal()
          .x((d) => d.y)
          .y((d) =>d.x);
        //draw path
        svg
          .selectAll("path")
          .data(paths)
          .enter()
          .append("path")
          .attr("stroke" ,"#000")
          .attr("d" , pathGenerator);
        //draw nodes
        svg
        .selectAll("text")
        .data(root.descendants())
        .enter()
        .append("text")
        .attr("opacity",0.5)
        .attr("color","black")
        .attr("font-size", d=> 3.5 - d.depth + "em")
        .attr("x",d=> d.y)
        .attr("y",d=>d.x)
        .text(({data}) => data.name );

        });
         

    },[]);
    return <svg ref={svgRef}/>;
}

export default App;
