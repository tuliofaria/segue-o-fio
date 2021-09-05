import { useForm } from 'react-hook-form'
import Twit from '../components/Twit'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { GrLinkedin } from 'react-icons/gr'
import { BiShareAlt } from 'react-icons/bi'

const Index = () => {
  const router = useRouter()
  const { register, watch, setValue } = useForm()
  const content = watch('content') || ''
  const showCounter = watch('showCounter') || false

  useEffect(() => {
    if (router?.query?.content) {
      setValue('content', router.query.content)
    }
    if (router?.query?.showCounter) {
      setValue('showCounter', router.query.showCounter)
    }
  }, [router])

  const twits = content
    .split('\n\n\n')
    .map((twit) => twit.trim())
    .filter((twit) => twit)

  const share = async () => {
    const shareUrl =
      process.env.NEXT_PUBLIC_APP_URL +
      '?content=' +
      escape(content) +
      '&showCounter=' +
      showCounter
    await navigator.clipboard.writeText(shareUrl)
  }

  return (
    <div className='max-w-6xl m-auto'>
      <h1 className='text-center'>
        <img className='inline' src='/logo-segue-o-fio.png' alt='Segue o fio' />
      </h1>
      <p className='px-8'>
        <label>
          <input type='checkbox' {...register('showCounter')} /> Mostrar
          contador
        </label>
        <button
          type='button'
          onClick={share}
          className='mx-4 py-3 px-6 text-white rounded-lg bg-yellow-400 shadow-lg block md:inline-block'
        >
          <BiShareAlt className='inline-block mr-2' />
          Compartilhar!
        </button>
      </p>
      <div className='mt-4 flex flex-row '>
        <div className='flex-1 p-2'>
          <h2 className='font-bold'>Conteúdo:</h2>
          <textarea
            placeholder='Digite seu conteúdo do fio aqui...'
            {...register('content')}
            className='w-full h-screen p-4 my-2 border rounded-lg'
          ></textarea>
        </div>
        <div className='flex-1 p-2'>
          <h2 className='font-bold'>Twits:</h2>
          {twits.map((twit, index) => (
            <Twit
              key={twit + '-' + index}
              twit={twit}
              showCounter={showCounter}
              current={index + 1}
              total={twits.length}
            />
          ))}
          {twits.length === 0 && (
            <div
              class='mt-2 py-3 px-5 bg-yellow-100 text-yellow-900 text-sm rounded-md border border-yellow-200'
              role='alert'
            >
              Comece digitando seu conteúdo.
            </div>
          )}
        </div>
      </div>
      <footer className='text-center py-4'>
        <p>
          <a href='https://linkedin.com/in/tuliofaria'>
            Desenvolvido por: <GrLinkedin className='inline' /> Tulio Faria
          </a>
        </p>
        <p>
          Projeto desenvolvido durante o{' '}
          <a href='https://www.devpleno.com/devreactjs'>DevReactJS</a> do{' '}
          <a href='https://www.devpleno.com'>DevPleno</a>.
        </p>
      </footer>
    </div>
  )
}
export default Index
