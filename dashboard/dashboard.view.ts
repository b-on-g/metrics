namespace $.$$ {
	const Events_dict = $giper_baza_dict_to($bog_metrics_event)

	export class $bog_metrics_dashboard extends $.$bog_metrics_dashboard {

		land() {
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(this.metrics_land_link()))
		}

		events_dict() {
			return this.land().Data(Events_dict)
		}

		@$mol_mem
		all_events() {
			const dict = this.events_dict()
			const keys = dict.keys()
			return keys.map(key => {
				const ev = dict.key(key)
				if (!ev) return null
				return {
					key,
					app: ev.App()?.val() ?? '',
					type: ev.Type()?.val() ?? '',
					url: ev.Url()?.val() ?? '',
					uid: ev.Uid()?.val() ?? '',
					session_id: ev.Session_id()?.val() ?? '',
					timestamp: ev.Timestamp()?.val() ?? 0,
					referrer: ev.Referrer()?.val() ?? '',
					data: ev.Data()?.val() ?? '',
				}
			}).filter(Boolean) as {
				key: string
				app: string
				type: string
				url: string
				uid: string
				session_id: string
				timestamp: number
				referrer: string
				data: string
			}[]
		}

		@$mol_mem
		app_options() {
			const apps = new Set(this.all_events().map(e => e.app).filter(Boolean))
			const dict: Record<string, string> = {}
			for (const app of [...apps].sort()) {
				dict[app] = app
			}
			return dict
		}

		@$mol_mem
		app(next?: string): string {
			if (next !== undefined) return next
			const opts = Object.keys(this.app_options())
			return opts[0] ?? ''
		}

		filtered_events() {
			const app = this.app()
			if (!app) return this.all_events()
			return this.all_events().filter(e => e.app === app)
		}

		page_body() {
			switch (this.page()) {
				case 'sessions': return [this.Sessions()]
				case 'vitals': return [this.Vitals()]
				case 'errors': return [this.Errors()]
				default: return [this.Overview()]
			}
		}
	}
}
