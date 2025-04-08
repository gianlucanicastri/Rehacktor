export function formatDate(dateString) {
    let parts = dateString.split('-')
    let hasDay = parts.length > 2
  
    return new Date(`${dateString}`).toLocaleDateString('it-IT', {
      day: hasDay ? 'numeric' : undefined,
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    })
  }