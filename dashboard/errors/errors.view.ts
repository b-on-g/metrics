namespace $.$$ {

	interface ErrorGroup {
		message: string
		count: number
		last_seen: number
	}

	export class $bog_metrics_dashboard_errors extends $.$bog_metrics_dashboard_errors {

		@$mol_mem
		error_events() {
			return this.all_events().filter(e => e.type === 'error')
		}

		@$mol_mem
		errors_grouped(): ErrorGroup[] {
			const map = new Map<string, ErrorGroup>()

			for (const ev of this.error_events()) {
				let message = ''
				try {
					const d = JSON.parse(ev.data)
					message = d.message ?? 'Unknown'
				} catch {
					message = 'Unknown'
				}

				const existing = map.get(message)
				if (existing) {
					existing.count++
					if (ev.timestamp > existing.last_seen) existing.last_seen = ev.timestamp
				} else {
					map.set(message, { message, count: 1, last_seen: ev.timestamp })
				}
			}

			return [...map.values()].sort((a, b) => b.count - a.count)
		}

		total_errors() {
			return String(this.error_events().length)
		}

		unique_errors() {
			return String(this.errors_grouped().length)
		}

		error_rows() {
			return this.errors_grouped().map((_, i) => this.Error_row(i))
		}

		error_message(index: number) {
			return this.errors_grouped()[index]?.message ?? ''
		}

		error_count(index: number) {
			const g = this.errors_grouped()[index]
			return g ? `${g.count} occurrences` : ''
		}

		error_last_seen(index: number) {
			const g = this.errors_grouped()[index]
			return g ? `Last: ${new Date(g.last_seen).toLocaleString()}` : ''
		}
	}
}
