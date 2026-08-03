import { notFound } from 'next/navigation'
import dbConnect from '@/lib/mongodb'
import ServiceModel from '@/lib/models/Service'
import { ServiceForm } from '../ServiceForm'

type Params = { params: { slug: string } }

export default async function EditServicePage({ params }: Params) {
  await dbConnect()
  const service = await ServiceModel.findOne({ slug: params.slug }).lean()
  if (!service) notFound()

  const serialized = JSON.parse(JSON.stringify(service))

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">Edit Service</h1>
      <div className="mt-6">
        <ServiceForm initialData={serialized} />
      </div>
    </div>
  )
}
