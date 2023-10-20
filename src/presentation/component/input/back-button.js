import back from '../../asset/images/back.svg'
import { useNavigate } from 'react-router-dom'

export default function BackButton () {
    const navigate = useNavigate()

    return (
        <div style={{ padding: '20px 20px 0 20px' }} onClick={() => navigate(-1)}>
            <img src={back}  />
        </div>
    )
}