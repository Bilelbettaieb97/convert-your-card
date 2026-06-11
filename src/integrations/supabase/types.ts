export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ads_estimations: {
        Row: {
          avg_basket: number | null
          budget_monthly: number
          city: string | null
          company: string | null
          created_at: string
          email: string
          email_sent: boolean | null
          estimated_clicks: number | null
          estimated_leads: number | null
          estimated_revenue: number | null
          estimated_roas: number | null
          id: string
          name: string
          phone: string | null
          platform: string | null
          sector: string
        }
        Insert: {
          avg_basket?: number | null
          budget_monthly: number
          city?: string | null
          company?: string | null
          created_at?: string
          email: string
          email_sent?: boolean | null
          estimated_clicks?: number | null
          estimated_leads?: number | null
          estimated_revenue?: number | null
          estimated_roas?: number | null
          id?: string
          name: string
          phone?: string | null
          platform?: string | null
          sector: string
        }
        Update: {
          avg_basket?: number | null
          budget_monthly?: number
          city?: string | null
          company?: string | null
          created_at?: string
          email?: string
          email_sent?: boolean | null
          estimated_clicks?: number | null
          estimated_leads?: number | null
          estimated_revenue?: number | null
          estimated_roas?: number | null
          id?: string
          name?: string
          phone?: string | null
          platform?: string | null
          sector?: string
        }
        Relationships: []
      }
      blog_articles: {
        Row: {
          author_name: string | null
          category: string
          content: string
          created_at: string | null
          excerpt: string | null
          id: string
          image: string | null
          meta_description: string | null
          published: boolean | null
          published_at: string | null
          read_time: string | null
          slug: string
          tags: Json | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          author_name?: string | null
          category?: string
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          meta_description?: string | null
          published?: boolean | null
          published_at?: string | null
          read_time?: string | null
          slug: string
          tags?: Json | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          author_name?: string | null
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          meta_description?: string | null
          published?: boolean | null
          published_at?: string | null
          read_time?: string | null
          slug?: string
          tags?: Json | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      builder_progress: {
        Row: {
          step: number
          step_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          step?: number
          step_name?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          step?: number
          step_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      builder_relance_series: {
        Row: {
          builder_step_at_send: number | null
          click_token: string
          clicked_at: string | null
          email: string
          id: string
          sent_at: string | null
          step: number
        }
        Insert: {
          builder_step_at_send?: number | null
          click_token?: string
          clicked_at?: string | null
          email: string
          id?: string
          sent_at?: string | null
          step: number
        }
        Update: {
          builder_step_at_send?: number | null
          click_token?: string
          clicked_at?: string | null
          email?: string
          id?: string
          sent_at?: string | null
          step?: number
        }
        Relationships: []
      }
      card_previews: {
        Row: {
          card_data: Json
          created_at: string | null
          expires_at: string | null
          id: string
          token: string
        }
        Insert: {
          card_data: Json
          created_at?: string | null
          expires_at?: string | null
          id?: string
          token: string
        }
        Update: {
          card_data?: Json
          created_at?: string | null
          expires_at?: string | null
          id?: string
          token?: string
        }
        Relationships: []
      }
      chatbot_leads: {
        Row: {
          created_at: string
          domain: string | null
          email: string
          email_sent: boolean | null
          grade: string | null
          id: string
          name: string
          phone: string | null
          score_global: number | null
          website_url: string | null
        }
        Insert: {
          created_at?: string
          domain?: string | null
          email: string
          email_sent?: boolean | null
          grade?: string | null
          id?: string
          name: string
          phone?: string | null
          score_global?: number | null
          website_url?: string | null
        }
        Update: {
          created_at?: string
          domain?: string | null
          email?: string
          email_sent?: boolean | null
          grade?: string | null
          id?: string
          name?: string
          phone?: string | null
          score_global?: number | null
          website_url?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          main_challenge: string | null
          message: string | null
          name: string
          phone: string | null
          project: string | null
          project_type: string | null
          timeline: string | null
          urgency: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          main_challenge?: string | null
          message?: string | null
          name: string
          phone?: string | null
          project?: string | null
          project_type?: string | null
          timeline?: string | null
          urgency?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          main_challenge?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          project?: string | null
          project_type?: string | null
          timeline?: string | null
          urgency?: string | null
        }
        Relationships: []
      }
      cookie_consents: {
        Row: {
          action: string | null
          analytics: boolean | null
          consent_id: string
          created_at: string | null
          id: string
          ip_country: string | null
          marketing: boolean | null
          necessary: boolean | null
          page_url: string | null
          preferences: boolean | null
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          action?: string | null
          analytics?: boolean | null
          consent_id: string
          created_at?: string | null
          id?: string
          ip_country?: string | null
          marketing?: boolean | null
          necessary?: boolean | null
          page_url?: string | null
          preferences?: boolean | null
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string | null
          analytics?: boolean | null
          consent_id?: string
          created_at?: string | null
          id?: string
          ip_country?: string | null
          marketing?: boolean | null
          necessary?: boolean | null
          page_url?: string | null
          preferences?: boolean | null
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      cron_execution_logs: {
        Row: {
          duration_ms: number | null
          errors: string | null
          id: string
          ran_at: string | null
          results: Json | null
          total_sent: number
        }
        Insert: {
          duration_ms?: number | null
          errors?: string | null
          id?: string
          ran_at?: string | null
          results?: Json | null
          total_sent?: number
        }
        Update: {
          duration_ms?: number | null
          errors?: string | null
          id?: string
          ran_at?: string | null
          results?: Json | null
          total_sent?: number
        }
        Relationships: []
      }
      design_audits: {
        Row: {
          company: string | null
          created_at: string
          domain: string
          email: string
          email_sent: boolean | null
          grade: string | null
          id: string
          issues_count: number | null
          name: string
          phone: string | null
          report_html: string | null
          score_cta: number | null
          score_global: number
          score_hierarchy: number | null
          score_images: number | null
          score_mobile: number | null
          score_navigation: number | null
          score_trust: number | null
          website_url: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          domain: string
          email: string
          email_sent?: boolean | null
          grade?: string | null
          id?: string
          issues_count?: number | null
          name: string
          phone?: string | null
          report_html?: string | null
          score_cta?: number | null
          score_global: number
          score_hierarchy?: number | null
          score_images?: number | null
          score_mobile?: number | null
          score_navigation?: number | null
          score_trust?: number | null
          website_url: string
        }
        Update: {
          company?: string | null
          created_at?: string
          domain?: string
          email?: string
          email_sent?: boolean | null
          grade?: string | null
          id?: string
          issues_count?: number | null
          name?: string
          phone?: string | null
          report_html?: string | null
          score_cta?: number | null
          score_global?: number
          score_hierarchy?: number | null
          score_images?: number | null
          score_mobile?: number | null
          score_navigation?: number | null
          score_trust?: number | null
          website_url?: string
        }
        Relationships: []
      }
      devis_submissions: {
        Row: {
          company: string | null
          company_description: string | null
          created_at: string | null
          email: string
          id: string
          message: string | null
          name: string
          offer: string | null
          phone: string | null
          sector: string | null
        }
        Insert: {
          company?: string | null
          company_description?: string | null
          created_at?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          offer?: string | null
          phone?: string | null
          sector?: string | null
        }
        Update: {
          company?: string | null
          company_description?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          offer?: string | null
          phone?: string | null
          sector?: string | null
        }
        Relationships: []
      }
      email_queue: {
        Row: {
          created_at: string | null
          error_msg: string | null
          form_type: string
          html_body: string
          id: string
          lead_email: string
          send_at: string
          sent_at: string | null
          series_index: number
          status: string
          subject: string
        }
        Insert: {
          created_at?: string | null
          error_msg?: string | null
          form_type: string
          html_body: string
          id?: string
          lead_email: string
          send_at: string
          sent_at?: string | null
          series_index: number
          status?: string
          subject: string
        }
        Update: {
          created_at?: string | null
          error_msg?: string | null
          form_type?: string
          html_body?: string
          id?: string
          lead_email?: string
          send_at?: string
          sent_at?: string | null
          series_index?: number
          status?: string
          subject?: string
        }
        Relationships: []
      }
      email_relance_series: {
        Row: {
          click_token: string
          clicked_at: string | null
          email: string
          id: string
          sent_at: string
          step: number
          user_id: string | null
        }
        Insert: {
          click_token?: string
          clicked_at?: string | null
          email: string
          id?: string
          sent_at?: string
          step?: number
          user_id?: string | null
        }
        Update: {
          click_token?: string
          clicked_at?: string | null
          email?: string
          id?: string
          sent_at?: string
          step?: number
          user_id?: string | null
        }
        Relationships: []
      }
      mentions_legales: {
        Row: {
          address: string | null
          company: string | null
          company_type: string | null
          created_at: string
          email: string
          email_sent: boolean | null
          host: string | null
          id: string
          name: string
          phone: string | null
          siret: string | null
        }
        Insert: {
          address?: string | null
          company?: string | null
          company_type?: string | null
          created_at?: string
          email: string
          email_sent?: boolean | null
          host?: string | null
          id?: string
          name: string
          phone?: string | null
          siret?: string | null
        }
        Update: {
          address?: string | null
          company?: string | null
          company_type?: string | null
          created_at?: string
          email?: string
          email_sent?: boolean | null
          host?: string | null
          id?: string
          name?: string
          phone?: string | null
          siret?: string | null
        }
        Relationships: []
      }
      mockup_requests: {
        Row: {
          company: string | null
          created_at: string | null
          current_site_url: string | null
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          sector: string | null
          site_type: string | null
          style: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          current_site_url?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          sector?: string | null
          site_type?: string | null
          style?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          current_site_url?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          sector?: string | null
          site_type?: string | null
          style?: string | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      nfc_analytics: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          profile_id: string
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nfc_analytics_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "nfc_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nfc_contacts: {
        Row: {
          city: string | null
          company: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          profile_id: string | null
          role: string | null
          source: string | null
          starred: boolean | null
          tags: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          profile_id?: string | null
          role?: string | null
          source?: string | null
          starred?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          profile_id?: string | null
          role?: string | null
          source?: string | null
          starred?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nfc_contacts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "nfc_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nfc_leads: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          profile_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          value: number | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          profile_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          value?: number | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          profile_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nfc_leads_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "nfc_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nfc_orders: {
        Row: {
          created_at: string | null
          id: string
          model: string
          order_ref: string
          profile_id: string | null
          qty: number | null
          shipping_address: Json | null
          status: string | null
          total_cents: number | null
          tracking_number: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          model?: string
          order_ref: string
          profile_id?: string | null
          qty?: number | null
          shipping_address?: Json | null
          status?: string | null
          total_cents?: number | null
          tracking_number?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          model?: string
          order_ref?: string
          profile_id?: string | null
          qty?: number | null
          shipping_address?: Json | null
          status?: string | null
          total_cents?: number | null
          tracking_number?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nfc_orders_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "nfc_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nfc_profiles: {
        Row: {
          actif: boolean | null
          badges: Json | null
          bg_type: string | null
          biens: Json | null
          bio: string | null
          boutons: Json
          card_data: Json | null
          couleur_accent: string | null
          cover_url: string | null
          created_at: string | null
          cta: Json | null
          custom_domain: string | null
          email: string
          entreprise: string
          fonction: string
          font_family: string | null
          gradient_end: string | null
          gradient_start: string | null
          id: string
          langues: Json | null
          logo_url: string | null
          nom: string
          photo_url: string | null
          plan: string | null
          reseaux: Json
          secteur: string | null
          sections_active: Json | null
          sections_order: Json | null
          services: Json | null
          show_branding: boolean | null
          site_web: string | null
          slug: string
          stats_cles: Json | null
          telephone: string
          temoignages: Json | null
          template_id: string | null
          updated_at: string | null
          user_id: string | null
          vcard_enabled: boolean | null
          video_url: string | null
        }
        Insert: {
          actif?: boolean | null
          badges?: Json | null
          bg_type?: string | null
          biens?: Json | null
          bio?: string | null
          boutons?: Json
          card_data?: Json | null
          couleur_accent?: string | null
          cover_url?: string | null
          created_at?: string | null
          cta?: Json | null
          custom_domain?: string | null
          email?: string
          entreprise?: string
          fonction?: string
          font_family?: string | null
          gradient_end?: string | null
          gradient_start?: string | null
          id?: string
          langues?: Json | null
          logo_url?: string | null
          nom?: string
          photo_url?: string | null
          plan?: string | null
          reseaux?: Json
          secteur?: string | null
          sections_active?: Json | null
          sections_order?: Json | null
          services?: Json | null
          show_branding?: boolean | null
          site_web?: string | null
          slug: string
          stats_cles?: Json | null
          telephone?: string
          temoignages?: Json | null
          template_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          vcard_enabled?: boolean | null
          video_url?: string | null
        }
        Update: {
          actif?: boolean | null
          badges?: Json | null
          bg_type?: string | null
          biens?: Json | null
          bio?: string | null
          boutons?: Json
          card_data?: Json | null
          couleur_accent?: string | null
          cover_url?: string | null
          created_at?: string | null
          cta?: Json | null
          custom_domain?: string | null
          email?: string
          entreprise?: string
          fonction?: string
          font_family?: string | null
          gradient_end?: string | null
          gradient_start?: string | null
          id?: string
          langues?: Json | null
          logo_url?: string | null
          nom?: string
          photo_url?: string | null
          plan?: string | null
          reseaux?: Json
          secteur?: string | null
          sections_active?: Json | null
          sections_order?: Json | null
          services?: Json | null
          show_branding?: boolean | null
          site_web?: string | null
          slug?: string
          stats_cles?: Json | null
          telephone?: string
          temoignages?: Json | null
          template_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          vcard_enabled?: boolean | null
          video_url?: string | null
        }
        Relationships: []
      }
      notification_prefs: {
        Row: {
          click_email: boolean | null
          click_push: boolean | null
          created_at: string | null
          id: string
          order_email: boolean | null
          order_push: boolean | null
          save_email: boolean | null
          save_push: boolean | null
          scan_email: boolean | null
          scan_push: boolean | null
          tips_email: boolean | null
          tips_push: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          click_email?: boolean | null
          click_push?: boolean | null
          created_at?: string | null
          id?: string
          order_email?: boolean | null
          order_push?: boolean | null
          save_email?: boolean | null
          save_push?: boolean | null
          scan_email?: boolean | null
          scan_push?: boolean | null
          tips_email?: boolean | null
          tips_push?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          click_email?: boolean | null
          click_push?: boolean | null
          created_at?: string | null
          id?: string
          order_email?: boolean | null
          order_push?: boolean | null
          save_email?: boolean | null
          save_push?: boolean | null
          scan_email?: boolean | null
          scan_push?: boolean | null
          tips_email?: boolean | null
          tips_push?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      offer_reservations: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone: string
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
        }
        Relationships: []
      }
      price_estimations: {
        Row: {
          budget: string | null
          company: string | null
          created_at: string | null
          description: string | null
          email: string
          features: Json | null
          id: string
          landing_objective: string | null
          name: string
          pages: string | null
          phone: string | null
          product_count: string | null
          refonte_improvements: Json | null
          refonte_reasons: Json | null
          refonte_url: string | null
          site_type: string | null
        }
        Insert: {
          budget?: string | null
          company?: string | null
          created_at?: string | null
          description?: string | null
          email: string
          features?: Json | null
          id?: string
          landing_objective?: string | null
          name: string
          pages?: string | null
          phone?: string | null
          product_count?: string | null
          refonte_improvements?: Json | null
          refonte_reasons?: Json | null
          refonte_url?: string | null
          site_type?: string | null
        }
        Update: {
          budget?: string | null
          company?: string | null
          created_at?: string | null
          description?: string | null
          email?: string
          features?: Json | null
          id?: string
          landing_objective?: string | null
          name?: string
          pages?: string | null
          phone?: string | null
          product_count?: string | null
          refonte_improvements?: Json | null
          refonte_reasons?: Json | null
          refonte_url?: string | null
          site_type?: string | null
        }
        Relationships: []
      }
      robots_generations: {
        Row: {
          company: string | null
          created_at: string
          domain: string
          email: string
          email_sent: boolean | null
          id: string
          name: string
          phone: string | null
          urls_discovered: number | null
          website_url: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          domain: string
          email: string
          email_sent?: boolean | null
          id?: string
          name: string
          phone?: string | null
          urls_discovered?: number | null
          website_url: string
        }
        Update: {
          company?: string | null
          created_at?: string
          domain?: string
          email?: string
          email_sent?: boolean | null
          id?: string
          name?: string
          phone?: string | null
          urls_discovered?: number | null
          website_url?: string
        }
        Relationships: []
      }
      sector_reports: {
        Row: {
          company: string | null
          created_at: string
          email: string
          email_sent: boolean | null
          id: string
          name: string
          phone: string | null
          sector_name: string
          sector_slug: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          email_sent?: boolean | null
          id?: string
          name: string
          phone?: string | null
          sector_name: string
          sector_slug: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          email_sent?: boolean | null
          id?: string
          name?: string
          phone?: string | null
          sector_name?: string
          sector_slug?: string
        }
        Relationships: []
      }
      seo_audits: {
        Row: {
          company: string | null
          created_at: string
          critical_count: number | null
          domain: string
          email: string
          email_sent: boolean | null
          grade: string | null
          id: string
          ip: string | null
          issues_count: number | null
          name: string
          phone: string | null
          report_html: string | null
          score_contenu: number | null
          score_geo: number | null
          score_global: number
          score_mobile: number | null
          score_onpage: number | null
          score_performance: number | null
          score_schema: number | null
          score_securite: number | null
          score_technique: number | null
          website_url: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          critical_count?: number | null
          domain: string
          email: string
          email_sent?: boolean | null
          grade?: string | null
          id?: string
          ip?: string | null
          issues_count?: number | null
          name: string
          phone?: string | null
          report_html?: string | null
          score_contenu?: number | null
          score_geo?: number | null
          score_global: number
          score_mobile?: number | null
          score_onpage?: number | null
          score_performance?: number | null
          score_schema?: number | null
          score_securite?: number | null
          score_technique?: number | null
          website_url: string
        }
        Update: {
          company?: string | null
          created_at?: string
          critical_count?: number | null
          domain?: string
          email?: string
          email_sent?: boolean | null
          grade?: string | null
          id?: string
          ip?: string | null
          issues_count?: number | null
          name?: string
          phone?: string | null
          report_html?: string | null
          score_contenu?: number | null
          score_geo?: number | null
          score_global?: number
          score_mobile?: number | null
          score_onpage?: number | null
          score_performance?: number | null
          score_schema?: number | null
          score_securite?: number | null
          score_technique?: number | null
          website_url?: string
        }
        Relationships: []
      }
      site_comparisons: {
        Row: {
          company: string | null
          created_at: string
          domain_a: string
          domain_b: string
          email: string
          email_sent: boolean | null
          id: string
          name: string
          phone: string | null
          score_a: number | null
          score_b: number | null
          url_a: string
          url_b: string
          winner: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          domain_a: string
          domain_b: string
          email: string
          email_sent?: boolean | null
          id?: string
          name: string
          phone?: string | null
          score_a?: number | null
          score_b?: number | null
          url_a: string
          url_b: string
          winner?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          domain_a?: string
          domain_b?: string
          email?: string
          email_sent?: boolean | null
          id?: string
          name?: string
          phone?: string | null
          score_a?: number | null
          score_b?: number | null
          url_a?: string
          url_b?: string
          winner?: string | null
        }
        Relationships: []
      }
      speed_audits: {
        Row: {
          company: string | null
          created_at: string
          domain: string
          email: string
          email_sent: boolean | null
          grade: string | null
          id: string
          issues_count: number | null
          name: string
          phone: string | null
          report_html: string | null
          score_assets: number | null
          score_blocking: number | null
          score_global: number
          score_practices: number | null
          score_server: number | null
          score_weight: number | null
          website_url: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          domain: string
          email: string
          email_sent?: boolean | null
          grade?: string | null
          id?: string
          issues_count?: number | null
          name: string
          phone?: string | null
          report_html?: string | null
          score_assets?: number | null
          score_blocking?: number | null
          score_global: number
          score_practices?: number | null
          score_server?: number | null
          score_weight?: number | null
          website_url: string
        }
        Update: {
          company?: string | null
          created_at?: string
          domain?: string
          email?: string
          email_sent?: boolean | null
          grade?: string | null
          id?: string
          issues_count?: number | null
          name?: string
          phone?: string | null
          report_html?: string | null
          score_assets?: number | null
          score_blocking?: number | null
          score_global?: number
          score_practices?: number | null
          score_server?: number | null
          score_weight?: number | null
          website_url?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          id: string
          plan: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          plan?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          plan?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      trial_relance_series: {
        Row: {
          clicked_at: string | null
          email: string
          id: string
          sent_at: string | null
          step: number
          user_id: string | null
        }
        Insert: {
          clicked_at?: string | null
          email: string
          id?: string
          sent_at?: string | null
          step?: number
          user_id?: string | null
        }
        Update: {
          clicked_at?: string | null
          email?: string
          id?: string
          sent_at?: string | null
          step?: number
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      vitrine_upgrade_series: {
        Row: {
          click_token: string
          clicked_at: string | null
          email: string
          id: string
          sent_at: string | null
          step: number
        }
        Insert: {
          click_token: string
          clicked_at?: string | null
          email: string
          id?: string
          sent_at?: string | null
          step: number
        }
        Update: {
          click_token?: string
          clicked_at?: string | null
          email?: string
          id?: string
          sent_at?: string | null
          step?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_create_nfc_profile: {
        Args: {
          p_bio?: string
          p_email: string
          p_entreprise: string
          p_fonction: string
          p_nom: string
          p_photo_url?: string
          p_slug: string
          p_telephone: string
        }
        Returns: {
          actif: boolean | null
          badges: Json | null
          bg_type: string | null
          biens: Json | null
          bio: string | null
          boutons: Json
          card_data: Json | null
          couleur_accent: string | null
          cover_url: string | null
          created_at: string | null
          cta: Json | null
          custom_domain: string | null
          email: string
          entreprise: string
          fonction: string
          font_family: string | null
          gradient_end: string | null
          gradient_start: string | null
          id: string
          langues: Json | null
          logo_url: string | null
          nom: string
          photo_url: string | null
          plan: string | null
          reseaux: Json
          secteur: string | null
          sections_active: Json | null
          sections_order: Json | null
          services: Json | null
          show_branding: boolean | null
          site_web: string | null
          slug: string
          stats_cles: Json | null
          telephone: string
          temoignages: Json | null
          template_id: string | null
          updated_at: string | null
          user_id: string | null
          vcard_enabled: boolean | null
          video_url: string | null
        }
        SetofOptions: {
          from: "*"
          to: "nfc_profiles"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_nfc_client: {
        Args: {
          p_boutons?: Json
          p_email: string
          p_nom: string
          p_password: string
          p_slug: string
          p_telephone: string
        }
        Returns: string
      }
      create_nfc_profile_webhook: {
        Args: {
          p_boutons?: Json
          p_email: string
          p_nom: string
          p_reseaux?: Json
          p_slug: string
          p_telephone: string
        }
        Returns: undefined
      }
      get_card_analytics: {
        Args: { p_profile_id: string }
        Returns: {
          created_at: string
          event_data: Json
          event_type: string
        }[]
      }
      get_outils_dashboard: { Args: { admin_token: string }; Returns: Json }
      get_user_funnel: {
        Args: never
        Returns: {
          actif: boolean
          builder_relance_clicked_at: string
          builder_relance_sent_at: string
          builder_relance_step: number
          builder_step: number
          builder_step_name: string
          email: string
          email_confirme_le: string
          entreprise: string
          fonction: string
          inscrit_le: string
          nom: string
          plan: string
          profil_cree_le: string
          relance_clicked_at: string
          relance_sent_at: string
          relance_step: number
          slug: string
          stripe_subscription_id: string
          subscription_cree_le: string
          subscription_status: string
          trial_end: string
          trial_relance_sent_at: string
          trial_relance_step: number
          user_id: string
          vitrine_relance_clicked_at: string
          vitrine_relance_sent_at: string
          vitrine_relance_step: number
        }[]
      }
      log_card_event: {
        Args: {
          p_event_data?: Json
          p_event_type: string
          p_profile_id: string
        }
        Returns: undefined
      }
      track_builderia_step: {
        Args: { p_step: number; p_step_name: string; p_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

