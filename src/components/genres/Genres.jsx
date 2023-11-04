/* eslint-disable react/prop-types */
import './Style.scss'
import { useSelector} from 'react-redux'

const Genres = ({data}) => {

    const { genres } = useSelector((state) => state.home);

  return (
    
    <div className='genres'>
        {data?.map((item) => {
            if(!genres[item]) return;
            return(
                <div className='genre' key={item}>
                    {genres[item]?.name}
                </div>
            )
        })};
    </div>
  )
};

export default Genres