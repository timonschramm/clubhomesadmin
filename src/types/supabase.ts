export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      actions: {
        Row: {
          created_at: number
          deleted_at: number | null
          id: number
          input: Json
          type: string
          updated_at: number | null
        }
        Insert: {
          created_at?: number
          deleted_at?: number | null
          id?: number
          input: Json
          type: string
          updated_at?: number | null
        }
        Update: {
          created_at?: number
          deleted_at?: number | null
          id?: number
          input?: Json
          type?: string
          updated_at?: number | null
        }
      }
      businesses: {
        Row: {
          created_at: number
          deleted_at: number | null
          id: string
          logo_link: string | null
          metadata: Json | null
          name: string
          updated_at: number | null
        }
        Insert: {
          created_at?: number
          deleted_at?: number | null
          id?: string
          logo_link?: string | null
          metadata?: Json | null
          name: string
          updated_at?: number | null
        }
        Update: {
          created_at?: number
          deleted_at?: number | null
          id?: string
          logo_link?: string | null
          metadata?: Json | null
          name?: string
          updated_at?: number | null
        }
      }
      event_categories: {
        Row: {
          created_at: number
          deleted_at: number | null
          distinctor: string | null
          id: number
          main: Database["public"]["Enums"]["main_category"]
          portrayal: string | null
          sub: Database["public"]["Enums"]["sub_category"]
          updated_at: number | null
        }
        Insert: {
          created_at?: number
          deleted_at?: number | null
          distinctor?: string | null
          id?: number
          main: Database["public"]["Enums"]["main_category"]
          portrayal?: string | null
          sub: Database["public"]["Enums"]["sub_category"]
          updated_at?: number | null
        }
        Update: {
          created_at?: number
          deleted_at?: number | null
          distinctor?: string | null
          id?: number
          main?: Database["public"]["Enums"]["main_category"]
          portrayal?: string | null
          sub?: Database["public"]["Enums"]["sub_category"]
          updated_at?: number | null
        }
      }
      event_locations: {
        Row: {
          city: string
          coordinates: unknown | null
          created_at: number
          deleted_at: number | null
          house_number: string
          id: number
          metadata: Json | null
          name: string | null
          seat_count: number | null
          street: string
          updated_at: number | null
          zip: string
        }
        Insert: {
          city: string
          coordinates?: unknown | null
          created_at?: number
          deleted_at?: number | null
          house_number: string
          id?: number
          metadata?: Json | null
          name?: string | null
          seat_count?: number | null
          street: string
          updated_at?: number | null
          zip: string
        }
        Update: {
          city?: string
          coordinates?: unknown | null
          created_at?: number
          deleted_at?: number | null
          house_number?: string
          id?: number
          metadata?: Json | null
          name?: string | null
          seat_count?: number | null
          street?: string
          updated_at?: number | null
          zip?: string
        }
      }
      event_participants: {
        Row: {
          created_at: number
          deleted_at: number | null
          event_id: number
          id: number
          participant_id: string
          participant_type: Database["public"]["Enums"]["t_participant"]
          updated_at: number | null
        }
        Insert: {
          created_at?: number
          deleted_at?: number | null
          event_id: number
          id?: number
          participant_id: string
          participant_type: Database["public"]["Enums"]["t_participant"]
          updated_at?: number | null
        }
        Update: {
          created_at?: number
          deleted_at?: number | null
          event_id?: number
          id?: number
          participant_id?: string
          participant_type?: Database["public"]["Enums"]["t_participant"]
          updated_at?: number | null
        }
      }
      events: {
        Row: {
          cancelled: boolean | null
          confirmed: boolean | null
          created_at: number
          deleted_at: number | null
          event_category_id: number
          event_location_id: number
          host_id: string
          host_type: Database["public"]["Enums"]["t_host"]
          id: number
          metadata: Json | null
          name: string | null
          starts_at: number
          tags: string[] | null
          updated_at: number | null
        }
        Insert: {
          cancelled?: boolean | null
          confirmed?: boolean | null
          created_at?: number
          deleted_at?: number | null
          event_category_id: number
          event_location_id: number
          host_id: string
          host_type: Database["public"]["Enums"]["t_host"]
          id?: number
          metadata?: Json | null
          name?: string | null
          starts_at: number
          tags?: string[] | null
          updated_at?: number | null
        }
        Update: {
          cancelled?: boolean | null
          confirmed?: boolean | null
          created_at?: number
          deleted_at?: number | null
          event_category_id?: number
          event_location_id?: number
          host_id?: string
          host_type?: Database["public"]["Enums"]["t_host"]
          id?: number
          metadata?: Json | null
          name?: string | null
          starts_at?: number
          tags?: string[] | null
          updated_at?: number | null
        }
      }
      failed_transactions: {
        Row: {
          created_at: number
          deleted_at: number | null
          endpoint: string
          err_msg: string
          id: number
          input: string
          new_input: Json | null
          updated_at: number | null
          updated_by: string | null
        }
        Insert: {
          created_at?: number
          deleted_at?: number | null
          endpoint: string
          err_msg: string
          id?: number
          input: string
          new_input?: Json | null
          updated_at?: number | null
          updated_by?: string | null
        }
        Update: {
          created_at?: number
          deleted_at?: number | null
          endpoint?: string
          err_msg?: string
          id?: number
          input?: string
          new_input?: Json | null
          updated_at?: number | null
          updated_by?: string | null
        }
      }
      leagues: {
        Row: {
          county: string | null
          created_at: number
          deleted_at: number | null
          district: string | null
          id: number
          league_type: string
          meta_league_id: number
          metadata: Json | null
          name: string
          updated_at: number | null
        }
        Insert: {
          county?: string | null
          created_at?: number
          deleted_at?: number | null
          district?: string | null
          id?: number
          league_type: string
          meta_league_id: number
          metadata?: Json | null
          name: string
          updated_at?: number | null
        }
        Update: {
          county?: string | null
          created_at?: number
          deleted_at?: number | null
          district?: string | null
          id?: number
          league_type?: string
          meta_league_id?: number
          metadata?: Json | null
          name?: string
          updated_at?: number | null
        }
      }
      meta_leagues: {
        Row: {
          age_group: string
          created_at: number
          deleted_at: number | null
          gender: Database["public"]["Enums"]["t_gender"]
          id: number
          sport_id: number
          updated_at: number | null
        }
        Insert: {
          age_group: string
          created_at?: number
          deleted_at?: number | null
          gender: Database["public"]["Enums"]["t_gender"]
          id?: number
          sport_id: number
          updated_at?: number | null
        }
        Update: {
          age_group?: string
          created_at?: number
          deleted_at?: number | null
          gender?: Database["public"]["Enums"]["t_gender"]
          id?: number
          sport_id?: number
          updated_at?: number | null
        }
      }
      teams: {
        Row: {
          created_at: number
          deleted_at: number | null
          id: string
          league_id: number
          logo_link: string | null
          meta_league_id: number
          metadata: Json | null
          name: string
          updated_at: number | null
        }
        Insert: {
          created_at?: number
          deleted_at?: number | null
          id?: string
          league_id: number
          logo_link?: string | null
          meta_league_id: number
          metadata?: Json | null
          name: string
          updated_at?: number | null
        }
        Update: {
          created_at?: number
          deleted_at?: number | null
          id?: string
          league_id?: number
          logo_link?: string | null
          meta_league_id?: number
          metadata?: Json | null
          name?: string
          updated_at?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      refresh_mat_views: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      main_category: "SPORT" | "MUSIC" | "COMEDY" | "ART" | "PARTY" | "OTHER"
      sub_category:
        | "TOURNAMENT"
        | "MATCH"
        | "CONCERT"
        | "FESTIVAL"
        | "STAND_UP"
        | "SHOW"
        | "GALLERY"
        | "EXIHIBITION"
        | "NIGHTCLUB"
        | "OPEN_AIR"
        | "MISC"
      t_gender: "male" | "female" | "diverse" | "other"
      t_genders: "male" | "female" | "diverse" | "other"
      t_host: "team" | "user" | "business"
      t_host_types: "team" | "user" | "business"
      t_participant: "team" | "user"
      t_participant_types: "team" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
