import { Head, useForm } from '@inertiajs/react'
import { useToast } from '../../hooks/useToast'
import Toast from "../../components/Toast"
import Form from './Form'

export default function New() {
  const { toast } = useToast()
  const { data, setData, post, processing, errors } = useForm({
    nade: {
      title: '',
      active: '',
      description: '',
      map_name: '',
      team_function: '',
    }
  })

  const handleChange = (field, value) => {
    setData(prev => ({
      ...prev,
      nade: {
        ...prev.nade,
        [field.split('.')[1]]: value
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/nades', {
      preserveScroll: true
    })
  }

  return (
    <>
      <Head title="New Nade" />
      {toast && <Toast {...toast} />}
      <section className="w-full">
        <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl py-8 px-8 mx-auto max-w-4xl">
          <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-neutral-50">Add new Nade</h2>
          <Form 
            errors={errors}
            data={data}
            processing={processing}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isEdit={false}
          />
        </div>
      </section>
    </>
  )
}