import React from "react";
import classes from "./SpreadChart.module.css";

class SpreadChart extends React.Component {
    state = {wrapperWidth: 0, wrapperHeight: 0};
    wrapperRef = React.createRef();
    canvasRef = React.createRef();
    firstRender = true;
    selected = false;

    setSelected = () => {
        this.selected = true;
    }

    resetSelected = () => {
        this.selected = false;
    }

    updateChart = event => {
        if (!this.selected) return;

        let canvasRect = event.target.getBoundingClientRect();

        let x = event.clientX - canvasRect.left;
        let y = event.clientY - canvasRect.top;

        const columnsCount = this.props.spreadPoints.length;
        const columnMaxHeight = (canvasRect.height - 40) / 2;

        let columnNumber = (Math.max(20, Math.min(canvasRect.width - 20 - 1, x)) - 20) / (canvasRect.width - 40) * columnsCount | 0;
        let columnHeight = -Math.max(-1, Math.min(1, (y - (canvasRect.height / 2)) / columnMaxHeight));

        this.props.patch(Math.max(0, Math.min(columnsCount - 1, columnNumber)), columnHeight);
    }

    updateSize = () => {
        let wrapperSize = this.wrapperRef.current.getBoundingClientRect();
        this.setState({wrapperWidth: wrapperSize.width | 0, wrapperHeight: wrapperSize.height | 0});
    }

    drawChart () {
        const ctx = this.canvasRef.current.getContext("2d");
        const width = this.state.wrapperWidth;
        const height = this.state.wrapperHeight;

        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = "#1E1E1F";
        ctx.beginPath();
        ctx.moveTo(20, height / 2);
        ctx.lineTo(width - 20, height / 2);
        ctx.moveTo(20, 20);
        ctx.lineTo(20, height - 20);

        let stepSize = (width - 40) / this.props.spreadPoints.length;
        let maxHeight = (height - 40) / 2;

        for (let i = 0; i < this.props.spreadPoints.length; i++) {
            let x = 20 + i * stepSize;
            let y = -this.props.spreadPoints[i] * maxHeight + height / 2;

            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    componentDidMount () {
        window.addEventListener("resize", this.updateSize);
        this.updateSize();
    }

    componentWillUnmount () {
        window.removeEventListener("resize", this.updateSize);
    }

    componentDidUpdate () {
        this.drawChart();
    }

    render () {
        if (this.firstRender) this.firstRender = false;
        else this.drawChart();

        return <div ref={this.wrapperRef} className={classes.wrapper}>
            <canvas 
            ref={this.canvasRef} 
            onMouseDown={this.setSelected}
            onMouseUp={this.resetSelected}
            onMouseLeave={this.resetSelected}
            onMouseMove={this.updateChart}
            className={classes.canvas}
            width={this.state.wrapperWidth}
            height={this.state.wrapperHeight}></canvas>
        </div>;
    }
}

export default SpreadChart;