namespace $.$$ {

	export class $bog_metrics_dashboard_overview extends $.$bog_metrics_dashboard_overview {

		pageview_events() {
			return this.all_events().filter(e => e.type === 'pageview')
		}

		today_start() {
			const d = new Date()
			d.setHours(0, 0, 0, 0)
			return d.getTime()
		}

		today_events() {
			const start = this.today_start()
			return this.pageview_events().filter(e => e.timestamp >= start)
		}

		dau() {
			const uids = new Set(this.today_events().map(e => e.uid))
			return String(uids.size)
		}

		pageviews_today() {
			return String(this.today_events().length)
		}

		sessions_today() {
			const start = this.today_start()
			const session_events = this.all_events().filter(
				e => e.type === 'session_start' && e.timestamp >= start
			)
			const sids = new Set(session_events.map(e => e.session_id))
			return String(sids.size)
		}

		@$mol_mem
		chart_data() {
			const by_day = new Map<string, number>()
			for (const ev of this.pageview_events()) {
				const day = new Date(ev.timestamp).toISOString().slice(0, 10)
				by_day.set(day, (by_day.get(day) ?? 0) + 1)
			}
			const sorted = [...by_day.entries()].sort((a, b) => a[0].localeCompare(b[0]))
			const last14 = sorted.slice(-14)
			return {
				labels: last14.map(([d]) => d.slice(5)),
				values: last14.map(([, v]) => v),
			}
		}

		chart_day_labels() {
			return this.chart_data().labels
		}

		chart_pageviews_y() {
			return this.chart_data().values
		}

		@$mol_mem
		top_pages_data() {
			const counts = new Map<string, number>()
			for (const ev of this.pageview_events()) {
				const url = ev.url
				counts.set(url, (counts.get(url) ?? 0) + 1)
			}
			return [...counts.entries()]
				.sort((a, b) => b[1] - a[1])
				.slice(0, 10)
		}

		top_pages_rows() {
			return this.top_pages_data().map((_, i) => this.Top_page_row(i))
		}

		Top_page_url(id: any) {
			return this.top_pages_data()[Number(id)]?.[0] ?? ''
		}

		Top_page_count(id: any) {
			return String(this.top_pages_data()[Number(id)]?.[1] ?? 0)
		}

		@$mol_mem
		top_referrers_data() {
			const counts = new Map<string, number>()
			for (const ev of this.pageview_events()) {
				const ref = ev.referrer || '(direct)'
				counts.set(ref, (counts.get(ref) ?? 0) + 1)
			}
			return [...counts.entries()]
				.sort((a, b) => b[1] - a[1])
				.slice(0, 10)
		}

		top_referrers_rows() {
			return this.top_referrers_data().map((_, i) => this.Top_referrer_row(i))
		}

		Top_referrer_url(id: any) {
			return this.top_referrers_data()[Number(id)]?.[0] ?? ''
		}

		Top_referrer_count(id: any) {
			return String(this.top_referrers_data()[Number(id)]?.[1] ?? 0)
		}
	}
}
