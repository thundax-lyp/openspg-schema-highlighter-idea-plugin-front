import {useNavigate} from 'react-router-dom'

function ResultPage() {
    const navigate = useNavigate()
    return (
        <div
            key="home"
            onClick={() => {
                navigate('/')
            }}
        >
            返回
        </div>
    )
}

export default ResultPage
