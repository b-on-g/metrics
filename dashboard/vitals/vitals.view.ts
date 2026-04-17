namespace $.$$ {

	interface VitalEntry {
		name: string
		value: number
		timestamp: number
	}

	export class $bog_metrics_dashboard_vitals extends $.$bog_metrics_dashboard_vitals {

		@$mol_mem
		vital_events(): VitalEntry[] {
			return this.all_events()
				.filter(e => e.type === 'vital')
				.map(e => {
					try {
						const d = JSON.parse(e.data)
						return { name: d.name ?? '', value: d.value ?? 0, timestamp: e.timestamp }
					} catch { return null }
				})
				.filter(Boolean) as VitalEntry[]
		}

		vitals_by_name(name: string) {
			return this.vital_events().filter(v => v.name === name)
		}

		p75(values: number[]) {
			if (!values.length) return null
			const sorted = [...values].sort((a, b) => a - b)
			const idx = Math.floor(sorted.length * 0.75)
			return sorted[idx]
		}

		lcp_p75() {
			const v = this.p75(this.vitals_by_name('largest-contentful-paint').map(v => v.value))
			return v != null ? `${Math.round(v)}ms` : '—'
		}

		inp_p75() {
			const v = this.p75(this.vitals_by_name('event').map(v => v.value))
			return v != null ? `${Math.round(v)}ms` : '—'
		}

		cls_p75() {
			const v = this.p75(this.vitals_by_name('layout-shift').map(v => v.value))
			return v != null ? v.toFixed(3) : '—'
		}

		@$mol_mem
		chart_lcp_data() {
			const entries = this.vitals_by_name('largest-contentful-paint')
				.sort((a, b) => a.timestamp - b.timestamp)
				.slice(-50)
			return {
				values: entries.map(e => Math.round(e.value)),
				labels: entries.map(e => new Date(e.timestamp).toLocaleTimeString()),
			}
		}

		chart_lcp_y() {
			return this.chart_lcp_data().values
		}

		chart_time_labels() {
			return this.chart_lcp_data().labels
		}

		visible_vitals() {
			return this.vital_events()
				.sort((a, b) => b.timestamp - a.timestamp)
				.slice(0, 50)
		}

		vital_rows() {
			return this.visible_vitals().map((_, i) => this.Vital_row(i))
		}

		vital_name(index: number) {
			return this.visible_vitals()[index]?.name ?? ''
		}

		vital_value(index: number) {
			const v = this.visible_vitals()[index]
			if (!v) return ''
			return v.name === 'layout-shift' ? v.value.toFixed(3) : `${Math.round(v.value)}ms`
		}

		vital_time(index: number) {
			const v = this.visible_vitals()[index]
			return v ? new Date(v.timestamp).toLocaleString() : ''
		}
	}
}
