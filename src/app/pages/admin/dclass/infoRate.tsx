import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {ApplicationState} from '../../../../store'

// import {Component} from '../../../../store/ducks/component/types'
import momentDurationFormatSetup from 'moment-duration-format';
import { Class } from '../../../../store/ducks/dclass/types'

import moment from 'moment'
momentDurationFormatSetup(MOMENT)

interface handleCloseProps {
  handleClose: () => void
  child: Class
}

const InfoRate = ({handleClose, child}: handleCloseProps) => {
  // const {id} = useParams();
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(loadLastClassRequest(child.id!))
  // }, [])
  //const component = useSelector((state: ApplicationState) => state.component)
  console.log(child)
  //return <div>oi</div>
  return (
    <>
      <div className='row g-5 gx-xxl-12'>
        <div className='col-xxl-12'>
          <h1>{child.name}</h1>
          {/* <div>{child.parent?.name}</div>
          <div>{child.parent?.parent?.name}</div> */}

          {/* <br /> */}
          {/* <h3>
            Duração:{' '}
            {moment.duration(child.duration, 'seconds').format('hh:mm:ss', {
              trim: false,
            })}
          </h3>
          <h3>
            Média:{' '}
            {child.completed
              ?.filter((child) => child.rate)
              .reduce((avg, value, _, {length}) => avg + value.rate! / length, 0)
              .toFixed(2) + ' '}
          </h3>
          <h3>
            Avaliações:{' '}
            {child.completed
              ?.filter((child) => child.rate)
              .reduce((avg, value, _, {length}) => length, 0)}{' '}
          </h3> */}
          <h3>
            Média:{' '}
            {child.rate
              ?.filter((child) => child.rate)
              .reduce((avg, value, _, {length}) => avg + value.rate! / length, 0)
              .toFixed(2) + ' '}
          </h3>
          
        </div>
        <div className='col-xxl-12'>
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bolder text-muted'>
                  <th className='min-w-50px'>Imagem</th>
                  <th className='min-w-140px'>Nome</th>
                  {/* <th className='min-w-140px'>Assistiu</th>
                  <th className='min-w-140px'>Progresso</th> */}
                  <th className='min-w-140px'>Avaliação</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {child.rate?.map((childCompleted) => (
                  <tr>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex justify-content-start flex-column'>
                          <img
                            //src={users.user.image}
                            //src={ image?.includes('https://') ? image : '../../files/' + image}
                            src={
                              childCompleted.user?.image?.includes('https://')
                                ? childCompleted.user?.image
                                : 'https://app.insiderhof.com.br/files/' +
                                  childCompleted.user?.image
                            }
                            style={{width: '35px', height: '35px'}}
                            onError={({currentTarget}) => {
                              currentTarget.onerror = null // prevents looping
                              currentTarget.src =
                                'https://app.insiderhof.com.br/files/notfound.jpg'
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>{childCompleted.user?.name}</td>
                    
                    <td>
                      {childCompleted.rate === 0 || childCompleted.rate === null ? (
                        'Nenhuma avaliação'
                      ) : childCompleted.rate! <= 3 ? (
                        <span className='text-danger'>{childCompleted.rate}</span>
                      ) : (
                        <span className='text-success'>{childCompleted.rate}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
        </div>
      </div>
    </>
  )
}
export default InfoRate
