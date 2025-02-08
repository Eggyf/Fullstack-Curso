
const Statistics = (props) => {
    if (props.good != 0 || props.neutral != 0 || props.bad != 0) {
        return (
            <>
                <h2>Statistics</h2>
                <p>good {props.good}</p>
                <p>neutral {props.neutral}</p>
                <p>bad {props.bad}</p>
                <p>all {props.all}</p>
                <p>average {props.avg}</p>
                <p>positive {props.positive} %</p>
            </>
        )
    }
    return (
        <>
            <h2>Statistics</h2>
            <p>No feedback given</p>
        </>
    )
}

export default Statistics