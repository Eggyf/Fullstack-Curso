
const Statistics = (props) => {
    return (
        <>
            <p>good { props.good }</p>
            <p>neutral { props.neutral }</p>
            <p>bad {props.bad}</p>
            <p>all {props.all}</p>
            <p>average {props.avg}</p>
            <p>positive {props.positive} %</p>
        </>
    ) 
}

export default Statistics