'use server'

import {
  CategorySchema,
  FormationSchema,
  ProjectSchema,
  TechnologySchema,
} from '@/lib/schemas'
import {
  CategoryFormState,
  FormationFormState,
  ProjectFormState,
  TechnologyFormState,
} from '@/lib/states'
import { db } from './db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertCategory(
  formState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  const parsed = CategorySchema.safeParse({
    id: formData.get('id'),
    slug: formData.get('slug'),
    title: formData.get('title'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    if (parsed.data.id) {
      await db
        .updateTable('port_categories')
        .set({
          slug: parsed.data.slug,
          title: parsed.data.title,
        })
        .where('id', '=', parsed.data.id)
        .execute()
    } else {
      await db
        .insertInto('port_categories')
        .values({
          slug: parsed.data.slug,
          title: parsed.data.title,
        })
        .execute()
    }
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: error.message } }
    } else {
      return { errors: { _form: 'Não foi possível conectar-se ao servidor.' } }
    }
  }

  revalidatePath('/')
  redirect('/dashboard')
}

export async function upsertTechnology(
  formState: TechnologyFormState,
  formData: FormData,
): Promise<TechnologyFormState> {
  const parsed = TechnologySchema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    url: formData.get('url'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    if (parsed.data.id) {
      await db
        .updateTable('port_technologies')
        .set({
          title: parsed.data.title,
          url: parsed.data.url,
        })
        .where('id', '=', parsed.data.id)
        .execute()
    } else {
      await db
        .insertInto('port_technologies')
        .values({
          title: parsed.data.title,
          url: parsed.data.url,
        })
        .execute()
    }
  } catch (error) {
    console.log(error)
    return {
      errors: { _form: 'Não foi possível conectar-se ao banco de dados' },
    }
  }

  revalidatePath('/')
  redirect('/dashboard')
}

export async function upsertFormation(
  formState: FormationFormState,
  formData: FormData,
): Promise<FormationFormState> {
  const parsed = FormationSchema.safeParse({
    id: formData.get('id'),
    institution: formData.get('institution'),
    title: formData.get('title'),
    duration_time: formData.get('duration_time'),
    certificate_url: formData.get('certificate_url'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    if (parsed.data.id) {
      await db
        .updateTable('port_formations')
        .set({
          institution: parsed.data.institution,
          title: parsed.data.title,
          duration_time: parsed.data.duration_time,
          certificate_url: parsed.data.certificate_url,
        })
        .where('id', '=', parsed.data.id)
        .execute()
    } else {
      await db
        .insertInto('port_formations')
        .values({
          institution: parsed.data.institution,
          title: parsed.data.title,
          duration_time: parsed.data.duration_time,
          certificate_url: parsed.data.certificate_url,
        })
        .execute()
    }
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: error.message } }
    } else {
      return { errors: { _form: 'Não foi possível conectar-se ao servidor.' } }
    }
  }

  revalidatePath('/')
  redirect('/dashboard')
}

export async function upsertProject(
  formState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const parsed = ProjectSchema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    description: formData.get('description'),
    slug: formData.get('slug'),
    created_at: formData.get('created_at'),
    website_url: formData.get('website_url'),
    presentation_video_url: formData.get('presentation_video_url'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    if (parsed.data.id) {
      await db
        .updateTable('port_projects')
        .set({
          title: parsed.data.title,
          description: parsed.data.description,
          slug: parsed.data.slug,
          created_at: parsed.data.created_at,
          website_url: parsed.data.website_url,
          presentation_video_url: parsed.data.presentation_video_url,
        })
        .where('id', '=', parsed.data.id)
        .execute()
    } else {
      await db
        .insertInto('port_projects')
        .values({
          title: parsed.data.title,
          description: parsed.data.description,
          slug: parsed.data.slug,
          created_at: parsed.data.created_at,
          website_url: parsed.data.website_url,
          presentation_video_url: parsed.data.presentation_video_url,
        })
        .execute()
    }
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: error.message } }
    } else {
      return { errors: { _form: 'Não foi possível conectar-se ao servidor.' } }
    }
  }

  revalidatePath('/')
  redirect('/dashboard')
}

export async function deleteCategory(id: number) {
  try {
    await db.deleteFrom('port_categories').where('id', '=', id).execute()
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return {
        success: false,
        message: 'Não foi possível conectar-se ao servidor.',
      }
    }
  }
}

export async function deleteTechnology(id: number) {
  try {
    await db.deleteFrom('port_technologies').where('id', '=', id).execute()
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return {
        success: false,
        message: 'Não foi possível conectar-se ao servidor.',
      }
    }
  }
}

export async function deleteFormation(id: number) {
  try {
    await db.deleteFrom('port_formations').where('id', '=', id).execute()
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return {
        success: false,
        message: 'Não foi possível conectar-se ao servidor.',
      }
    }
  }
}

export async function deleteProject(id: number) {
  try {
    await db.deleteFrom('port_projects').where('id', '=', id).execute()
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return {
        success: false,
        message: 'Não foi possível conectar-se ao servidor.',
      }
    }
  }
}