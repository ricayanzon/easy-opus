export interface Project {
  id: number
  name: string
}

export interface Task {
  id: number
  title: string
  description: string
  status: Status
}

export type Status = 'inprogress' | 'done' | 'finished' | 'not started' | 'unknown'