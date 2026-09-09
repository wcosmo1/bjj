#!/usr/bin/env python3
"""Generate Long Game: Gi & No-Gi BJJ for Tall, Thin & Lanky Beginners — sellable PDF.

Content is loaded from guide_content.json (exported from the app TypeScript data).
Regenerate JSON first if you changed src/lib/data/*:

  cd /workspace/lankybjj && npx tsx -e '
    import { TECHNIQUES } from "./src/lib/data/techniques.ts";
    import { MODULES } from "./src/lib/data/modules.ts";
    import { GI_CURRICULUM, NOGI_CURRICULUM } from "./src/lib/data/curriculum.ts";
    import { writeFileSync } from "fs";
    writeFileSync("scripts/guide_content.json", JSON.stringify({
      MODULES, TECHNIQUES, GI_CURRICULUM, NOGI_CURRICULUM
    }, null, 2));
  '
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, HRFlowable, Flowable,
)

# ── Colors ──
INK = HexColor("#0f172a")
INK2 = HexColor("#1e293b")
MUTED = HexColor("#475569")
LIGHT = HexColor("#64748b")
RULE = HexColor("#cbd5e1")
BG_SOFT = HexColor("#f1f5f9")
ACCENT = HexColor("#365314")
ACCENT2 = HexColor("#4d7c0f")
CARD_BORDER = HexColor("#94a3b8")
DISCLAIMER_BG = HexColor("#fef3c7")
DISCLAIMER_BORDER = HexColor("#d97706")
GI_ACCENT = HexColor("#0369a1")       # sky-700
NOGI_ACCENT = HexColor("#6d28d9")     # violet-700
CALLOUT_BG = HexColor("#fffbeb")      # amber-50
CALLOUT_BORDER = HexColor("#d97706")

PAGE_W, PAGE_H = letter
MARGIN = 0.7 * inch

SCRIPT_DIR = Path(__file__).resolve().parent
CONTENT_PATH = SCRIPT_DIR / "guide_content.json"


def load_content():
    with open(CONTENT_PATH, encoding="utf-8") as f:
        return json.load(f)


class ColoredBox(Flowable):
    def __init__(self, width, height, color):
        Flowable.__init__(self)
        self.box_width = width
        self.box_height = height
        self.color = color

    def wrap(self, availWidth, availHeight):
        return (self.box_width, self.box_height)

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.rect(0, 0, self.box_width, self.box_height, fill=1, stroke=0)


def make_styles():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        name="CoverTitle", fontName="Helvetica-Bold", fontSize=26,
        leading=32, textColor=white, alignment=TA_CENTER, spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        name="CoverSub", fontName="Helvetica", fontSize=12,
        leading=17, textColor=HexColor("#e2e8f0"), alignment=TA_CENTER, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="CoverTag", fontName="Helvetica-Bold", fontSize=11,
        leading=14, textColor=HexColor("#a3e635"), alignment=TA_CENTER, spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name="H1", fontName="Helvetica-Bold", fontSize=18,
        leading=22, textColor=INK, spaceBefore=4, spaceAfter=10,
    ))
    styles.add(ParagraphStyle(
        name="H2", fontName="Helvetica-Bold", fontSize=14,
        leading=18, textColor=INK, spaceBefore=8, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="H3", fontName="Helvetica-Bold", fontSize=12,
        leading=15, textColor=ACCENT, spaceBefore=6, spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name="Body", fontName="Helvetica", fontSize=10,
        leading=14, textColor=INK2, alignment=TA_JUSTIFY, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="BodyLeft", fontName="Helvetica", fontSize=10,
        leading=14, textColor=INK2, alignment=TA_LEFT, spaceAfter=5,
    ))
    styles.add(ParagraphStyle(
        name="BulletItem", fontName="Helvetica", fontSize=10,
        leading=13.5, textColor=INK2, leftIndent=14, spaceAfter=3,
    ))
    styles.add(ParagraphStyle(
        name="Cue", fontName="Helvetica-Oblique", fontSize=9.5,
        leading=12.5, textColor=MUTED, leftIndent=14, spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        name="Small", fontName="Helvetica", fontSize=8.5,
        leading=11, textColor=MUTED, alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name="TOCEntry", fontName="Helvetica", fontSize=11,
        leading=16, textColor=INK2, spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name="ModuleBanner", fontName="Helvetica-Bold", fontSize=15,
        leading=19, textColor=white, alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name="ModuleSub", fontName="Helvetica", fontSize=10,
        leading=13, textColor=HexColor("#d9f99d"), alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name="TechName", fontName="Helvetica-Bold", fontSize=12.5,
        leading=15, textColor=INK, spaceBefore=2, spaceAfter=3,
    ))
    styles.add(ParagraphStyle(
        name="Label", fontName="Helvetica-Bold", fontSize=9,
        leading=11, textColor=ACCENT2, spaceBefore=5, spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        name="Disclaimer", fontName="Helvetica", fontSize=9,
        leading=12, textColor=HexColor("#78350f"), alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name="WeekTitle", fontName="Helvetica-Bold", fontSize=11,
        leading=14, textColor=INK, spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        name="WeekFocus", fontName="Helvetica-Oblique", fontSize=9.5,
        leading=12, textColor=MUTED, spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name="CheckItem", fontName="Helvetica", fontSize=9.5,
        leading=13, textColor=INK2, leftIndent=4, spaceAfter=3,
    ))
    styles.add(ParagraphStyle(
        name="LogLabel", fontName="Helvetica-Bold", fontSize=9,
        leading=11, textColor=MUTED, spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        name="Callout", fontName="Helvetica", fontSize=9,
        leading=12, textColor=HexColor("#78350f"), alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name="PartTitle", fontName="Helvetica-Bold", fontSize=20,
        leading=24, textColor=white, alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name="Badge", fontName="Helvetica-Bold", fontSize=8,
        leading=10, textColor=white,
    ))
    return styles


def escape(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def add_page_number(canvas, doc):
    canvas.saveState()
    page = canvas.getPageNumber()
    if page > 1:
        canvas.setStrokeColor(RULE)
        canvas.setLineWidth(0.5)
        canvas.line(MARGIN, PAGE_H - 0.45 * inch, PAGE_W - MARGIN, PAGE_H - 0.45 * inch)
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(LIGHT)
        canvas.drawString(
            MARGIN, PAGE_H - 0.38 * inch,
            "Long Game  ·  Gi & No-Gi Lanky BJJ Guide",
        )
        canvas.line(MARGIN, 0.5 * inch, PAGE_W - MARGIN, 0.5 * inch)
        canvas.drawCentredString(PAGE_W / 2, 0.32 * inch, f"{page}")
    canvas.restoreState()


def build_cover(styles, story, n_tech, n_mod):
    cover_w = PAGE_W - 2 * MARGIN
    cover_h = PAGE_H - 2 * MARGIN - 0.3 * inch
    inner = []
    inner.append(Spacer(1, 1.35 * inch))
    inner.append(Paragraph("LONG GAME", styles["CoverTag"]))
    inner.append(Spacer(1, 0.2 * inch))
    inner.append(Paragraph(
        "Gi &amp; No-Gi BJJ for Tall,<br/>Thin &amp; Lanky Beginners",
        styles["CoverTitle"],
    ))
    inner.append(Spacer(1, 0.15 * inch))
    inner.append(HRFlowable(
        width="40%", thickness=2, color=HexColor("#a3e635"),
        spaceBefore=4, spaceAfter=12, hAlign="CENTER",
    ))
    inner.append(Paragraph(
        'A practical dual-track technique guide &amp; two 12-week curricula<br/>'
        'for athletes built like 6\'4" / 148 lbs',
        styles["CoverSub"],
    ))
    inner.append(Spacer(1, 0.4 * inch))
    inner.append(Paragraph(
        "Shared Principles  ·  Part A: Gi  ·  Part B: No-Gi",
        styles["CoverTag"],
    ))
    inner.append(Spacer(1, 0.15 * inch))
    inner.append(Paragraph(
        f"{n_tech} techniques  ·  {n_mod} modules  ·  Gi track + No-Gi track",
        ParagraphStyle(
            "CoverMeta2", fontName="Helvetica", fontSize=10,
            textColor=HexColor("#cbd5e1"), alignment=TA_CENTER,
        ),
    ))
    inner.append(Spacer(1, 1.5 * inch))
    inner.append(Paragraph("LONG GAME", ParagraphStyle(
        "CoverAuthor", fontName="Helvetica-Bold", fontSize=12,
        textColor=white, alignment=TA_CENTER, spaceAfter=4,
    )))
    inner.append(Paragraph(
        "Digital Training Guide",
        ParagraphStyle(
            "CoverMeta", fontName="Helvetica", fontSize=9,
            textColor=HexColor("#94a3b8"), alignment=TA_CENTER,
        ),
    ))
    t = Table([[inner]], colWidths=[cover_w], rowHeights=[cover_h])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), INK),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 28),
        ("RIGHTPADDING", (0, 0), (-1, -1), 28),
        ("TOPPADDING", (0, 0), (-1, -1), 20),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 20),
        ("BOX", (0, 0), (-1, -1), 0, INK),
    ]))
    story.append(t)
    story.append(PageBreak())


def build_toc(styles, story, modules, techniques):
    story.append(Paragraph("Contents", styles["H1"]))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceAfter=14))

    entries = [
        ("01", "Who This Is For &amp; How to Use This Guide"),
        ("02", "Educational Disclaimer"),
        ("03", "Shared Principles — Why Lanky Bodies Win Differently"),
        ("04", "Part A — Gi Guide for Lanky Beginners"),
        ("05", "Part B — No-Gi Guide for Lanky Beginners"),
        ("06", "Shared — Strength &amp; Recovery Tips"),
        ("07", "12-Week Gi Curriculum"),
        ("08", "12-Week No-Gi Curriculum"),
        ("09", "Training Log Templates"),
    ]
    for num, title in entries:
        story.append(Paragraph(
            f'<font color="#4d7c0f"><b>{num}</b></font>    {title}',
            styles["TOCEntry"],
        ))

    gi_n = sum(1 for t in techniques if t["ruleSet"] in ("gi", "both"))
    ng_n = sum(1 for t in techniques if t["ruleSet"] in ("nogi", "both"))
    story.append(Spacer(1, 0.35 * inch))
    story.append(Paragraph(
        f"<b>{len(techniques)} techniques</b> across <b>{len(modules)} modules</b> "
        f"(~{gi_n} usable in gi / ~{ng_n} usable in no-gi, including shared). "
        f"Two separate 12-week checklists — pick the track that matches how you train.",
        styles["BodyLeft"],
    ))
    story.append(PageBreak())


def build_who_and_howto(styles, story):
    story.append(Paragraph("Who This Is For", styles["H1"]))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceAfter=10))
    story.append(Paragraph(
        "This guide is for tall, thin, lanky, and underweight Brazilian Jiu-Jitsu beginners — "
        'athletes like the Long Game archetype (example: <b>6\'4", 148 lbs</b>) who keep getting '
        "smashed by heavier partners and need a game that actually fits their frame.",
        styles["Body"],
    ))
    story.append(Paragraph(
        "You get <b>one product with two tracks</b>: a full Gi guide and a full No-Gi guide, "
        "plus shared principles that apply to both. Train gi only, no-gi only, or both — "
        "follow the matching 12-week curriculum.",
        styles["Body"],
    ))

    story.append(Paragraph("Lanky principles that apply to both", styles["H2"]))
    for b in [
        "Create space with skeletal frames — make them climb your limbs.",
        "Manage distance: feet on hips/biceps, knee shields, active hooks.",
        "Finish with angles (triangles, armbars, back takes), not strength contests.",
        "Pass with mobility and connection — not raw smash weight.",
        "Protect recovery: light athletes gas from smash + under-fueling more than from “bad cardio genetics.”",
    ]:
        story.append(Paragraph(f"•  {escape(b)}", styles["BulletItem"]))

    story.append(Spacer(1, 0.12 * inch))
    story.append(Paragraph("What changes without the gi", styles["H2"]))
    story.append(Paragraph(
        "<b>Transfers:</b> frames, distance, knee slice mechanics, triangle/armbar angles, "
        "seatbelt + hooks, sprawls, top pressure as connection.",
        styles["BodyLeft"],
    ))
    story.append(Paragraph(
        "<b>Changes:</b> collar/sleeve → underhooks, overhooks, wrist control, and body locks; "
        "spider/lasso → butterfly, SLX, knee shield; collar chokes → rear naked choke and front headlock attacks.",
        styles["BodyLeft"],
    ))

    story.append(Spacer(1, 0.15 * inch))
    story.append(Paragraph("How to Use This Guide", styles["H1"]))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceAfter=10))
    for line in [
        "<b>1. Read Shared Principles first.</b> The “why lanky” ideas change how you read every card.",
        "<b>2. Choose Part A (Gi), Part B (No-Gi), or both.</b> Each technique card flags Gi / No-Gi / Both and often includes a transfer callout.",
        "<b>3. Follow the matching 12-week curriculum.</b> Separate Gi and No-Gi tracks — clearer than mixing weekly focuses.",
        "<b>4. Log sessions.</b> Shared training log pages at the back (includes Gi / No-Gi checkbox).",
        "<b>5. Train under a qualified instructor.</b> This guide supports mat work; it does not replace coaching or tapping early.",
    ]:
        story.append(Paragraph(line, styles["BodyLeft"]))
    story.append(PageBreak())


def build_disclaimer(styles, story):
    story.append(Paragraph("Educational Disclaimer", styles["H1"]))
    story.append(HRFlowable(width="100%", thickness=1.5, color=DISCLAIMER_BORDER, spaceAfter=12))
    box_content = [
        Paragraph(
            "<b>Important:</b> This guide provides educational grappling guidance for training awareness only. "
            "It is <b>not</b> medical, nutrition, or professional coaching advice.",
            styles["Disclaimer"],
        ),
        Spacer(1, 6),
        Paragraph(
            "• Train under qualified instructors at a reputable academy.<br/>"
            "• Consult licensed professionals for health, injury, weight, or nutrition concerns.<br/>"
            "• Tap early while learning. Ego injuries cost months.<br/>"
            "• Strength &amp; recovery tips are general training suggestions, not personalized prescriptions.<br/>"
            "• Always follow your gym’s safety rules and your instructor’s direction.",
            styles["Disclaimer"],
        ),
    ]
    t = Table([[box_content]], colWidths=[PAGE_W - 2 * MARGIN - 12])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), DISCLAIMER_BG),
        ("BOX", (0, 0), (-1, -1), 1.5, DISCLAIMER_BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.25 * inch))
    story.append(Paragraph(
        "By using this guide you acknowledge that Brazilian Jiu-Jitsu involves physical risk, "
        "and that you are responsible for training safely within your limits.",
        styles["Body"],
    ))
    story.append(PageBreak())


def part_divider(styles, story, part_label, title, subtitle, color):
    cover_w = PAGE_W - 2 * MARGIN
    left = [
        Paragraph(part_label, ParagraphStyle(
            "PartNum", fontName="Helvetica-Bold", fontSize=10,
            textColor=HexColor("#a3e635"), spaceAfter=6,
        )),
        Paragraph(escape(title), styles["PartTitle"]),
        Spacer(1, 6),
        Paragraph(escape(subtitle), styles["ModuleSub"]),
    ]
    t = Table([[left]], colWidths=[cover_w])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), color),
        ("LEFTPADDING", (0, 0), (-1, -1), 18),
        ("RIGHTPADDING", (0, 0), (-1, -1), 18),
        ("TOPPADDING", (0, 0), (-1, -1), 22),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 22),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.2 * inch))


def module_banner(styles, module, story, accent=None):
    cover_w = PAGE_W - 2 * MARGIN
    bg = accent or INK
    rs = module.get("ruleSet", "both")
    rs_label = {"gi": "GI", "nogi": "NO-GI", "both": "GI & NO-GI"}.get(rs, rs.upper())
    left = [
        Paragraph(
            f"MODULE {module['order']}  ·  {rs_label}",
            ParagraphStyle(
                "ModNum", fontName="Helvetica-Bold", fontSize=9,
                textColor=HexColor("#a3e635"), spaceAfter=4,
            ),
        ),
        Paragraph(escape(module["title"]), styles["ModuleBanner"]),
        Spacer(1, 4),
        Paragraph(escape(module["subtitle"]), styles["ModuleSub"]),
    ]
    t = Table([[left]], colWidths=[cover_w])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LEFTPADDING", (0, 0), (-1, -1), 16),
        ("RIGHTPADDING", (0, 0), (-1, -1), 16),
        ("TOPPADDING", (0, 0), (-1, -1), 14),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.16 * inch))


def transfer_callout(styles, note):
    elements = [
        Paragraph("GI ↔ NO-GI CALLOUT", styles["Label"]),
        Paragraph(escape(note), styles["Callout"]),
    ]
    card = Table([[elements]], colWidths=[PAGE_W - 2 * MARGIN - 20])
    card.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CALLOUT_BG),
        ("BOX", (0, 0), (-1, -1), 0.8, CALLOUT_BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return card


def technique_card(styles, tech, index, story):
    elements = []
    rs = tech.get("ruleSet", "both")
    rs_label = {"gi": "Gi", "nogi": "No-Gi", "both": "Gi & No-Gi"}[rs]
    elements.append(Paragraph(
        f"{index}.  {escape(tech['name'])}  "
        f'<font color="#4d7c0f" size="9">[{escape(rs_label)}]</font>',
        styles["TechName"],
    ))
    elements.append(HRFlowable(width="100%", thickness=0.6, color=RULE, spaceAfter=6))

    elements.append(Paragraph("WHY IT FITS LANKY FRAMES", styles["Label"]))
    elements.append(Paragraph(escape(tech["whyLanky"]), styles["BodyLeft"]))

    if tech.get("transferNote"):
        elements.append(Spacer(1, 4))
        elements.append(transfer_callout(styles, tech["transferNote"]))
        elements.append(Spacer(1, 4))

    elements.append(Paragraph("KEY CUES", styles["Label"]))
    for c in tech["cues"]:
        elements.append(Paragraph(f"→  {escape(c)}", styles["Cue"]))

    elements.append(Paragraph("STEPS", styles["Label"]))
    for i, s in enumerate(tech["steps"], 1):
        elements.append(Paragraph(f"<b>{i}.</b>  {escape(s)}", styles["BulletItem"]))

    elements.append(Paragraph("COMMON MISTAKES", styles["Label"]))
    for m in tech["mistakes"]:
        elements.append(Paragraph(f"✗  {escape(m)}", styles["BulletItem"]))

    elements.append(Spacer(1, 0.1 * inch))
    card = Table([[elements]], colWidths=[PAGE_W - 2 * MARGIN - 8])
    card.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BG_SOFT),
        ("BOX", (0, 0), (-1, -1), 0.8, CARD_BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(KeepTogether([card, Spacer(1, 0.14 * inch)]))


def techs_for(techniques, module_id):
    return [t for t in techniques if t["moduleId"] == module_id]


def build_module_section(styles, story, module, techniques, accent=None):
    module_banner(styles, module, story, accent=accent)
    story.append(Paragraph("Overview", styles["H3"]))
    for para in module["overview"]:
        story.append(Paragraph(escape(para), styles["Body"]))
    story.append(Spacer(1, 0.06 * inch))
    story.append(Paragraph("Technique Cards", styles["H3"]))
    story.append(Spacer(1, 0.04 * inch))
    techs = techs_for(techniques, module["id"])
    for i, tech in enumerate(techs, 1):
        technique_card(styles, tech, i, story)
    story.append(PageBreak())


def build_curriculum_track(styles, story, weeks, title, intro):
    story.append(Paragraph(title, styles["H1"]))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceAfter=8))
    story.append(Paragraph(intro, styles["Body"]))
    story.append(Spacer(1, 0.1 * inch))
    for week in weeks:
        block = []
        block.append(Paragraph(
            f"Week {week['week']}  —  {escape(week['title'])}",
            styles["WeekTitle"],
        ))
        block.append(Paragraph(f"Focus: {escape(week['focus'])}", styles["WeekFocus"]))
        for item in week["items"]:
            label = item["label"] if isinstance(item, dict) else item
            block.append(Paragraph(f"☐    {escape(label)}", styles["CheckItem"]))
        block.append(Spacer(1, 4))
        card = Table([[block]], colWidths=[PAGE_W - 2 * MARGIN - 6])
        card.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), BG_SOFT if week["week"] % 2 else white),
            ("BOX", (0, 0), (-1, -1), 0.6, RULE),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ("LINEBEFORE", (0, 0), (0, 0), 3, ACCENT2),
        ]))
        story.append(KeepTogether([card, Spacer(1, 0.1 * inch)]))
    story.append(PageBreak())


def log_session_block(styles, session_num):
    elements = []
    elements.append(Paragraph(f"Session {session_num}", styles["H3"]))
    row1 = Table(
        [[
            Paragraph("<b>Date:</b>  ____________________", styles["LogLabel"]),
            Paragraph("<b>Duration (min):</b>  ________", styles["LogLabel"]),
            Paragraph("<b>Gi / No-Gi:</b>  ________", styles["LogLabel"]),
        ]],
        colWidths=[2.4 * inch, 2.2 * inch, 2.2 * inch],
    )
    row1.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    elements.append(row1)
    elements.append(Paragraph("<b>Track focus (Gi / No-Gi / Shared):</b>  _______________________________", styles["LogLabel"]))
    elements.append(Spacer(1, 4))
    elements.append(Paragraph("<b>Drills practiced:</b>", styles["LogLabel"]))
    for _ in range(3):
        elements.append(Paragraph("_" * 92, styles["Small"]))
        elements.append(Spacer(1, 3))
    elements.append(Spacer(1, 4))
    elements.append(Paragraph("<b>Notes / where I got stuck:</b>", styles["LogLabel"]))
    for _ in range(4):
        elements.append(Paragraph("_" * 92, styles["Small"]))
        elements.append(Spacer(1, 3))
    elements.append(Spacer(1, 4))
    elements.append(Paragraph(
        "<b>Technique focus next session:</b>  _______________________________________________",
        styles["LogLabel"],
    ))
    elements.append(Spacer(1, 6))
    card = Table([[elements]], colWidths=[PAGE_W - 2 * MARGIN - 6])
    card.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BG_SOFT),
        ("BOX", (0, 0), (-1, -1), 0.8, CARD_BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return KeepTogether([card, Spacer(1, 0.16 * inch)])


def build_training_logs(styles, story):
    story.append(Paragraph("Training Log Templates", styles["H1"]))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceAfter=8))
    story.append(Paragraph(
        "Shared logs for both tracks. Mark Gi or No-Gi each session. "
        "Logging where you get stuck is more valuable than logging wins.",
        styles["Body"],
    ))
    story.append(Spacer(1, 0.08 * inch))
    for i in range(1, 9):
        story.append(log_session_block(styles, i))
        if i % 2 == 0 and i < 8:
            story.append(PageBreak())
            story.append(Paragraph("Training Log Templates (continued)", styles["H2"]))
            story.append(Spacer(1, 0.06 * inch))

    story.append(PageBreak())
    story.append(Paragraph("Weekly Summary Sheet", styles["H1"]))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceAfter=10))
    story.append(Paragraph(
        "At the end of each week, fill one row per track you trained. "
        "Track sessions, primary focus, and one lesson learned.",
        styles["Body"],
    ))

    header_white = [
        Paragraph("<font color='white'><b>Week</b></font>", styles["Small"]),
        Paragraph("<font color='white'><b>Track</b></font>", styles["Small"]),
        Paragraph("<font color='white'><b># Sess.</b></font>", styles["Small"]),
        Paragraph("<font color='white'><b>Primary Focus</b></font>", styles["Small"]),
        Paragraph("<font color='white'><b>One Lesson Learned</b></font>", styles["Small"]),
    ]
    rows = [header_white]
    for w in range(1, 13):
        rows.append([
            Paragraph(str(w), styles["Small"]),
            Paragraph("Gi / NG", styles["Small"]),
            Paragraph("", styles["Small"]),
            Paragraph("", styles["Small"]),
            Paragraph("", styles["Small"]),
        ])
    col_w = [0.55 * inch, 0.7 * inch, 0.65 * inch, 2.0 * inch, 3.3 * inch]
    table = Table(rows, colWidths=col_w, rowHeights=[22] + [26] * 12)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("GRID", (0, 0), (-1, -1), 0.5, RULE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 0), (2, -1), "CENTER"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("BACKGROUND", (0, 1), (-1, 1), BG_SOFT),
        ("BACKGROUND", (0, 3), (-1, 3), BG_SOFT),
        ("BACKGROUND", (0, 5), (-1, 5), BG_SOFT),
        ("BACKGROUND", (0, 7), (-1, 7), BG_SOFT),
        ("BACKGROUND", (0, 9), (-1, 9), BG_SOFT),
        ("BACKGROUND", (0, 11), (-1, 11), BG_SOFT),
    ]))
    story.append(table)

    story.append(Spacer(1, 0.35 * inch))
    story.append(Paragraph("Closing Note", styles["H2"]))
    story.append(Paragraph(
        "Tall and light is not a disadvantage — it is a different rule set in both gi and no-gi. "
        "Keep framing, keep your feet (and hooks) active, finish with angles, and protect recovery. "
        "Consistency on the mats beats any single perfect technique. Play the long game.",
        styles["Body"],
    ))
    story.append(Spacer(1, 0.25 * inch))
    story.append(HRFlowable(width="40%", thickness=1, color=ACCENT, spaceAfter=10, hAlign="CENTER"))
    story.append(Paragraph(
        "<b>Long Game</b>  ·  Gi &amp; No-Gi BJJ for Tall, Thin &amp; Lanky Beginners",
        ParagraphStyle("Close", fontName="Helvetica", fontSize=10,
                       textColor=MUTED, alignment=TA_CENTER),
    ))
    story.append(Paragraph(
        "Educational grappling guidance only. Not medical or coaching advice.",
        ParagraphStyle("Close2", fontName="Helvetica", fontSize=8,
                       textColor=LIGHT, alignment=TA_CENTER, spaceBefore=4),
    ))


def main():
    content = load_content()
    modules = sorted(content["MODULES"], key=lambda m: m["order"])
    techniques = content["TECHNIQUES"]
    gi_weeks = content["GI_CURRICULUM"]
    nogi_weeks = content["NOGI_CURRICULUM"]

    by_id = {m["id"]: m for m in modules}

    out_primary = "/workspace/Long-Game-Lanky-BJJ-Guide.pdf"
    out_copy = "/workspace/lankybjj/Long-Game-Lanky-BJJ-Guide.pdf"

    styles = make_styles()
    story = []

    doc = SimpleDocTemplate(
        out_primary,
        pagesize=letter,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=0.65 * inch,
        bottomMargin=0.65 * inch,
        title="Long Game: Gi & No-Gi BJJ for Tall, Thin & Lanky Beginners",
        author="Long Game",
        subject="Lanky BJJ Gi & No-Gi technique guide with dual 12-week curricula",
    )

    build_cover(styles, story, len(techniques), len(modules))
    build_toc(styles, story, modules, techniques)
    build_who_and_howto(styles, story)
    build_disclaimer(styles, story)

    # Shared principles
    build_module_section(styles, story, by_id["why-lanky"], techniques, accent=INK)

    # Part A — Gi
    part_divider(
        styles, story,
        "PART A",
        "Gi Guide for Lanky Beginners",
        "Grips, spider/lasso/DLR, gi passing, collar finishes, and standing for tall athletes",
        GI_ACCENT,
    )
    story.append(Paragraph(
        "Part A is your gi game: collar and sleeve as levers, open guards that reward long legs, "
        "and light-athlete passing that does not rely on smash weight. Watch the amber callouts "
        "for what still works when you take the jacket off.",
        styles["Body"],
    ))
    story.append(PageBreak())

    for mid in ["gi-grips-standing", "gi-guard", "gi-passing-subs"]:
        build_module_section(styles, story, by_id[mid], techniques, accent=GI_ACCENT)

    # Part B — No-Gi
    part_divider(
        styles, story,
        "PART B",
        "No-Gi Guide for Lanky Beginners",
        "Underhooks, butterfly/SLX, wrestling up, guillotine/darce awareness, and RNC back takes",
        NOGI_ACCENT,
    )
    story.append(Paragraph(
        "Part B replaces fabric with connection: underhooks, body locks, butterfly elevation, "
        "SLX, and front headlock chains. Same lanky physics — different handles. "
        "If you only train no-gi, start here after Shared Principles.",
        styles["Body"],
    ))
    story.append(PageBreak())

    for mid in ["nogi-clinch", "nogi-guards", "nogi-wrestling-pass", "nogi-subs"]:
        build_module_section(styles, story, by_id[mid], techniques, accent=NOGI_ACCENT)

    # Shared recovery
    build_module_section(styles, story, by_id["strength-recovery"], techniques, accent=INK)

    # Curricula
    build_curriculum_track(
        styles, story, gi_weeks,
        "12-Week Gi Curriculum",
        "Checklist plan for gi training: survival → grips → spider/lasso/DLR → standing → "
        "passing → submissions → recovery → integration. Check items as you complete them.",
    )
    build_curriculum_track(
        styles, story, nogi_weeks,
        "12-Week No-Gi Curriculum",
        "Checklist plan for no-gi training: survival → underhooks → butterfly/SLX → clinch → "
        "passing/wrestling-up → front headlock/RNC → recovery → integration. "
        "Run this track if you train no-gi primarily (or in parallel with the Gi track).",
    )

    build_training_logs(styles, story)

    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    shutil.copy2(out_primary, out_copy)

    pages = None
    try:
        from pypdf import PdfReader
        pages = len(PdfReader(out_primary).pages)
    except Exception:
        try:
            r = subprocess.run(["pdfinfo", out_primary], capture_output=True, text=True)
            for line in r.stdout.splitlines():
                if line.startswith("Pages:"):
                    pages = int(line.split(":")[1].strip())
        except Exception:
            pages = "?"

    size = os.path.getsize(out_primary)
    print(f"PRIMARY={out_primary}")
    print(f"COPY={out_copy}")
    print(f"PAGES={pages}")
    print(f"BYTES={size}")
    print(f"KB={size/1024:.1f}")
    print(f"TECHNIQUES={len(techniques)}")
    print(f"MODULES={len(modules)}")


if __name__ == "__main__":
    main()
