import { notFound } from 'next/navigation'
import dbConnect from '@/lib/mongodb'
import CaseStudyModel from '@/lib/models/CaseStudy'
import { PortfolioForm } from '../PortfolioForm'

type Params = { params: { slug: string } }

export default async function EditCaseStudyPage({ params }: Params) {
  await dbConnect()
  const study = await CaseStudyModel.findOne({ slug: params.slug }).lean()
  if (!study) notFound()

  const serialized = JSON.parse(JSON.stringify(study))

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">Edit Case Study</h1>
      <div className="mt-6">
        <PortfolioForm initialData={serialized} />
      </div>
    </div>
  )
}
