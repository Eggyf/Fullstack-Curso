import StatisticLine from "./StatisticLine"
const Statistics = (props) => {
    if (props.good != 0 || props.neutral != 0 || props.bad != 0) {
        return (
            <>
                <h2>Statistics</h2>

                <table>
                    <tbody>
                        <StatisticLine text={'good'} stat={props.good}/>
                        <StatisticLine text={'neutral'} stat={props.neutral} />
                        <StatisticLine text={'bad'} stat={props.bad} />
                        <StatisticLine text={'all'} stat={props.all} />
                        <StatisticLine text={'average'} stat={props.avg} />
                        <StatisticLine text={'positive'} stat={props.positive}/>
                    </tbody>
                </table>
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