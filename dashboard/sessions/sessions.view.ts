namespace $.$$ {

	interface Session {
		session_id: string
		uid: string
		start: number
		end: number
		pageviews: number
	}

	export class $bog_metrics_dashboard_sessions extends $.$bog_metrics_dashboard_sessions {

		@$mol_mem
		sessions_grouped(): Session[] {
			const map = new Map<string, Session>()

			for (const ev of this.all_events()) {
				const sid = ev.session_id
				if (!sid) continue

				let s = map.get(sid)
				if (!s) {
					s = { session_id: sid, uid: ev.uid, start: ev.timestamp, end: ev.timestamp, pageviews: 0 }
					map.set(sid, s)
				}

				if (ev.timestamp < s.start) s.start = ev.timestamp
				if (ev.timestamp > s.end) s.end = ev.timestamp
				if (ev.type === 'pageview') s.pageviews++
			}

			return [...map.values()].sort((a, b) => b.start - a.start)
		}

		total_sessions() {
			return String(this.sessions_grouped().length)
		}

		avg_duration() {
			const sessions = this.sessions_grouped()
			if (!sessions.length) return '—'
			const total = sessions.reduce((sum, s) => sum + (s.end - s.start), 0)
			const avg_sec = Math.round(total / sessions.length / 1000)
			if (avg_sec < 60) return `${avg_sec}s`
			return `${Math.round(avg_sec / 60)}m`
		}

		avg_pages() {
			const sessions = this.sessions_grouped()
			if (!sessions.length) return '0'
			const total = sessions.reduce((sum, s) => sum + s.pageviews, 0)
			return (total / sessions.length).toFixed(1)
		}

		visible_sessions() {
			return this.sessions_grouped().slice(0, 50)
		}

		session_rows() {
			return this.visible_sessions().map((_, i) => this.Session_row(i))
		}

		session_uid(index: number) {
			const s = this.visible_sessions()[index]
			return s ? s.uid.slice(0, 8) : ''
		}

		session_duration(index: number) {
			const s = this.visible_sessions()[index]
			if (!s) return ''
			const sec = Math.round((s.end - s.start) / 1000)
			if (sec < 60) return `${sec}s`
			return `${Math.round(sec / 60)}m`
		}

		session_pages(index: number) {
			const s = this.visible_sessions()[index]
			return s ? `${s.pageviews} pv` : ''
		}

		session_time(index: number) {
			const s = this.visible_sessions()[index]
			if (!s) return ''
			return new Date(s.start).toLocaleString()
		}
	}
}
