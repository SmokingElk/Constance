import classes from "./Range.module.css";
import React from "react";

/*
Компонент ползунка со стандартным для приложения дизайном. Содержит внутренние состояния для корректной обработки пользовательского 
ввода.
 */ 

class Range extends React.Component {
    state = { selected: false };
    container = React.createRef();

    setSelected = () => {
        this.setState({ selected: true });
    };

    resetSelected = () => {
        this.setState({ selected: false });
    };

    componentDidMount() {
        this.resetSelected();
    }

    onMouseMove = (event) => {
        if (!this.state.selected) return;

        let rect = event.target.getBoundingClientRect();

        let x = event.clientX - rect.left;

        let value = (Math.max(10, Math.min(rect.width - 10, x)) - 10) / (rect.width - 20);
        let valueMapped = value * (this.props.max - this.props.min) + this.props.min;
        this.props.onChange(valueMapped);
    };

    calcThumbOffset(valueMapped) {
        let maxWidth = 0;
        if (this.container.current)
            maxWidth = this.container.current.getBoundingClientRect().width - 20;

        return valueMapped * maxWidth + "px";
    }

    render() {
        let valueMapped = Math.min(
            1,
            Math.max(0, (this.props.value - this.props.min) / (this.props.max - this.props.min)),
        );
        let progressWidth = valueMapped * 100;

        return (
            <div
                style={{ width: this.props.width ?? "100%" }}
                className={classes.rangeContainer}
                onMouseDown={this.setSelected}
                onMouseUp={this.resetSelected}
                onMouseLeave={this.resetSelected}
                onMouseMove={this.onMouseMove}
                ref={this.container}
            >
                <div className={classes.body}>
                    <div className={classes.progress} style={{ width: progressWidth + "%" }}></div>
                </div>

                <div
                    className={classes.thumb + " " + (this.state.selected && classes.big)}
                    style={{ left: this.calcThumbOffset(valueMapped) }}
                ></div>
            </div>
        );
    }
}

export default Range;
