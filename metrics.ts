namespace $.$$ {
	const Events_dict = $giper_baza_dict_to($bog_metrics_event)

	export class $bog_metrics extends $.$bog_metrics {

		static land_link = 'CaoqVcdi_Ix22TDSf'

		land() {
			return this.$.$giper_baza_glob.Land(new $giper_baza_link($bog_metrics.land_link))
		}

		events_dict() {
			const land = this.land()
			if (!land) return null
			return land.Data(Events_dict)
		}

		uid() {
			const key = 'bog_metrics_uid'
			let uid = localStorage.getItem(key)
			if (!uid) {
				uid = crypto.randomUUID()
				localStorage.setItem(key, uid)
			}
			return uid
		}

		session_id() {
			return (this.constructor as any)._session_id ??= crypto.randomUUID()
		}

		sanitize_url(url: string) {
			try {
				const u = new URL(url)
				return u.origin + u.pathname + u.search
			} catch {
				return url.replace(/[^\w/?.&=#:-]/g, '')
			}
		}

		dnt_enabled() {
			if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return false
			return navigator.doNotTrack === '1'
				|| (navigator as any).globalPrivacyControl === true
		}

		track_safe(type: string, data?: Record<string, any>) {
			try {
				if (this.dnt_enabled()) return

				const dict = this.events_dict()
				if (!dict) return

				const key = crypto.randomUUID()
				const event = dict.key(key, 'auto')
				if (!event) return

				event.Type('auto')!.val(type)
				event.Url('auto')!.val(this.sanitize_url(location.href))
				event.Uid('auto')!.val(this.uid())
				event.Session_id('auto')!.val(this.session_id())
				event.Timestamp('auto')!.val(Date.now())
				event.Referrer('auto')!.val(document.referrer || '')

				if (data) {
					event.Data('auto')!.val(JSON.stringify(data))
				}

				console.log('[metrics]', type)
			} catch (e) {
				console.warn('[metrics] track failed:', type, e)
			}
		}

		render() {
			this.init_tracking()
			this.listen_visibility()
			this.listen_errors()
			this.listen_vitals()
			return null
		}

		@$mol_mem
		init_tracking() {
			setTimeout(() => {
				this.track_safe('pageview')
				this.track_safe('session_start')
			}, 1000)
			return null
		}

		@$mol_mem
		listen_visibility() {
			const handler = () => {
				if (document.visibilityState === 'hidden') {
					this.track_safe('session_end')
				}
			}
			document.addEventListener('visibilitychange', handler)
			return { destructor: () => document.removeEventListener('visibilitychange', handler) }
		}

		@$mol_mem
		listen_errors() {
			const on_error = (event: ErrorEvent) => {
				this.track_safe('error', {
					message: event.message,
					filename: event.filename,
					lineno: event.lineno,
					colno: event.colno,
				})
			}
			const on_rejection = (event: PromiseRejectionEvent) => {
				this.track_safe('error', {
					message: String(event.reason),
				})
			}
			window.addEventListener('error', on_error)
			window.addEventListener('unhandledrejection', on_rejection)
			return {
				destructor: () => {
					window.removeEventListener('error', on_error)
					window.removeEventListener('unhandledrejection', on_rejection)
				},
			}
		}

		@$mol_mem
		listen_vitals() {
			try {
				const tracked = new Set<string>()
				const observer = new PerformanceObserver((list) => {
					for (const entry of list.getEntries()) {
						if (tracked.has(entry.entryType)) continue
						tracked.add(entry.entryType)
						this.track_safe('vital', {
							name: entry.name,
							value: (entry as any).value ?? entry.duration,
							entryType: entry.entryType,
						})
					}
				})
				observer.observe({ type: 'largest-contentful-paint', buffered: true })
				observer.observe({ type: 'layout-shift', buffered: true })
				return { destructor: () => observer.disconnect() }
			} catch {
				return null
			}
		}
	}
}
